import { FileIcon, UploadCloud, VideoIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { DropEvent, FileRejection } from "react-dropzone";
import { toast } from "sonner";

/**
 * File size formatter
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

interface UseDropzoneProps {
  onDrop: (file: File) => void;
  maxSize: number;
  errorMessages: {
    fileType?: string;
    fileSize?: string;
    generic?: string;
  };
}

export function useVideoDropzone({
  onDrop,
  maxSize,
  errorMessages,
}: UseDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [draggedFileType, setDraggedFileType] = useState<string | null>(null);

  const handleDragEnter = useCallback((event: DropEvent) => {
    setIsDragActive(true);
    if ("dataTransfer" in event && event.dataTransfer?.items?.[0]?.type) {
      setDraggedFileType(event.dataTransfer.items[0].type);
    }
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragActive(false);
    setDraggedFileType(null);
  }, []);

  const handleDropAccepted = useCallback(
    (files: File[]) => {
      const file = files[0];
      handleDragLeave();

      if (file.size > maxSize) {
        toast.error(
          `File too large. Maximum size is ${formatFileSize(maxSize)}`
        );
        return;
      }

      onDrop(file);
      toast.success("File uploaded successfully!");
    },
    [maxSize, onDrop]
  );

  const handleDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      handleDragLeave();
      const rejection = fileRejections[0];

      if (rejection.errors[0]?.code === "file-too-large") {
        toast.error(errorMessages.fileSize);
      } else if (rejection.errors[0]?.code === "file-invalid-type") {
        toast.error(errorMessages.fileType);
      } else {
        toast.error(errorMessages.generic);
      }
    },
    [errorMessages]
  );

  const getIconForFileType = useCallback((type: string | null) => {
    if (!type) return UploadCloud;
    if (type.startsWith("video/")) return VideoIcon;
    return FileIcon;
  }, []);

  const Icon = getIconForFileType(draggedFileType);

  return {
    isDragActive,
    Icon,
    handleDragEnter,
    handleDragLeave,
    handleDropAccepted,
    handleDropRejected,
  };
}
