/**
 * @fileoverview FFmpeg video file conversion utilities
 */

import { IVideoMetadata, IVideoProcessingConfig } from "@/types/video";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import {
  customCompressionConfig,
  whatsAppCompressionConfig,
  xCompressionConfig,
} from "./configuration";

// ============= Types & Interfaces =============

/**
 * Conversion result interface
 */
interface ConversionResult {
  /** URL for the converted file */
  url: string;
  /** Output filename */
  output: string;
  /** Output file as Blob */
  outputBlob: Blob;
}

// ============= Error Handling =============

/**
 * Error class for file conversion failures
 */
class FileConversionError extends Error {
  constructor(
    message: string,
    public readonly originalError?: Error,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = "FileConversionError";
  }
}

// ============= File Name Utilities =============

/**
 * Extracts file extension from filename
 * @param fileName - Name of the file
 * @returns File extension without dot or empty string if no extension
 */
export function getFileExtension(fileName: string): string {
  try {
    const match = /\.([^.]+)$/.exec(fileName?.trim());
    return match?.[1]?.toLowerCase() ?? "";
  } catch (error) {
    console.warn("Error extracting file extension:", error);
    return "";
  }
}

/**
 * Removes file extension from filename
 * @param fileName - Name of the file
 * @returns Filename without extension
 */
function removeFileExtension(fileName: string): string {
  try {
    const lastDotIndex = fileName.lastIndexOf(".");
    return lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;
  } catch (error) {
    console.warn("Error removing file extension:", error);
    return fileName;
  }
}

/**
 * Generates output filename based on input name and target format
 * @param inputName - Original filename
 * @param format - Target format
 * @returns Generated output filename
 */
function generateOutputFilename(inputName: string, format: string): string {
  const baseName = removeFileExtension(inputName);
  const sanitizedFormat = format.toLowerCase().replace(/^\./, "");
  return `${baseName}.${sanitizedFormat}`;
}

// ============= Blob Handling =============

/**
 * Creates a Blob URL from the converted file data
 * @param data - File data
 * @param mimeType - MIME type for the file
 * @returns Object URL for the blob
 */
function createBlobUrl(
  data: Uint8Array,
  mimeType: string
): {
  url: string;
  blob: Blob;
} {
  const baseType = mimeType.split("/")[0];
  const blob = new Blob([data], { type: baseType });
  const url = URL.createObjectURL(blob);
  return { url, blob };
}

// ============= FFmpeg Command Handling =============

/**
 * Determines the appropriate FFmpeg command based on settings
 */
function getConversionCommand(
  inputFile: string,
  outputFile: string,
  videoSettings: IVideoProcessingConfig
): string[] {
  if (videoSettings.enableXCommand) {
    return xCompressionConfig(inputFile, outputFile, videoSettings);
  }
  if (videoSettings.enableWCommand) {
    return whatsAppCompressionConfig(inputFile, outputFile, videoSettings);
  }
  return customCompressionConfig(inputFile, outputFile, videoSettings);
}

// ============= Main Conversion Function =============

/**
 * Converts a video file using FFmpeg
 * @param ffmpeg - FFmpeg instance
 * @param actionFile - Video metadata
 * @param videoSettings - Video processing configuration
 * @returns Promise resolving to conversion result
 * @throws {FileConversionError} If conversion fails
 */
export default async function convertFile(
  ffmpeg: FFmpeg,
  actionFile: IVideoMetadata,
  videoSettings: IVideoProcessingConfig
): Promise<ConversionResult> {
  const { file, name, mimeType } = actionFile;

  try {
    // Validate inputs
    if (!file || !name || !mimeType) {
      throw new FileConversionError(
        "Missing required file metadata",
        undefined,
        {
          file: !!file,
          name: !!name,
          mimeType: !!mimeType,
        }
      );
    }

    // Generate output filename
    const output = generateOutputFilename(name, videoSettings.format);

    // Write input file to FFmpeg virtual filesystem
    const fileData = await fetchFile(file);
    await ffmpeg.writeFile(name, fileData);

    // Get and execute conversion command
    const command = getConversionCommand(name, output, videoSettings);
    console.log("FFmpeg command:", command.join(" "));
    await ffmpeg.exec(command);

    // Read and process output file
    const outputData = await ffmpeg.readFile(output);
    const uint8Array =
      outputData instanceof Uint8Array
        ? outputData
        : new Uint8Array(Buffer.from(outputData));
    const { url, blob } = createBlobUrl(uint8Array, mimeType);

    return { url, output, outputBlob: blob };
  } catch (error) {
    throw new FileConversionError(
      "Video conversion failed",
      error instanceof Error ? error : undefined,
      {
        fileName: name,
        targetFormat: videoSettings.format,
        mimeType,
      }
    );
  } finally {
    try {
      // Cleanup: Remove input file from virtual filesystem
      await ffmpeg.deleteFile(name);
    } catch (error) {
      console.warn("Failed to cleanup input file:", error);
    }
  }
}
