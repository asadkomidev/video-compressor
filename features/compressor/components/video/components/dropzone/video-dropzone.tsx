/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import ReactDropzone from "react-dropzone";

import { cn } from "@/lib/utils";
import { DropzoneProps } from "@/props";
import {
  formatFileSize,
  useVideoDropzone,
} from "../../hooks/use-video-dropzone";

export const VideoDropzone: React.FC<DropzoneProps> = ({
  onDrop,
  acceptedFileTypes,
  disabled = false,
  maxSize = 100 * 1024 * 1024, // 100MB default
  errorMessages = {
    fileType: "Only video files are supported",
    fileSize: "File is too large",
    generic: "Something went wrong",
  },
  placeholder = "Drag 'n' drop some files here, or click to select files",
  isLoading = false,
  className,
}) => {
  const {
    isDragActive,
    Icon,
    handleDragEnter,
    handleDragLeave,
    handleDropAccepted,
    handleDropRejected,
  } = useVideoDropzone({
    onDrop,
    maxSize,
    errorMessages,
  });

  return (
    <ReactDropzone
      onDrop={handleDropAccepted}
      disabled={disabled || isLoading}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      accept={acceptedFileTypes}
      multiple={false}
      maxSize={maxSize}
      onDropRejected={handleDropRejected}>
      {({ getRootProps, getInputProps, isDragReject }) => (
        <div
          {...getRootProps()}
          className={cn(
            "relative w-full rounded-2xl  transition-colors duration-200",
            "min-h-[450px] flex flex-col items-center justify-center p-4 gap-4",
            isDragActive && !isDragReject && "border-primary bg-primary/5",
            isDragReject && "border-destructive bg-destructive/5",
            disabled && "opacity-50 cursor-not-allowed",
            isLoading && "animate-pulse",
            className
          )}>
          <input {...getInputProps()} />

          <Icon
            className={cn(
              "size-16 transition-transform duration-200 cursor-pointer",
              isDragActive && "scale-110",
              isDragReject && "text-destructive"
            )}
          />

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {isDragReject
                ? errorMessages.fileType
                : isLoading
                ? "Processing..."
                : placeholder}
            </p>
            {!isDragActive && (
              <p className="text-xs text-muted-foreground">
                Maximum file size: {formatFileSize(maxSize)}
              </p>
            )}
          </div>

          {/* Overlay for disabled state */}
          {disabled && (
            <div className="absolute inset-0 bg-background/50 rounded-lg backdrop-blur-sm" />
          )}
        </div>
      )}
    </ReactDropzone>
  );
};

export default VideoDropzone;
