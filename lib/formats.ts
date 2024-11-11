/**
 * @fileoverview Utility functions for formatting values
 */

// ============= Types & Interfaces =============

/** Size-related types */

interface SizeReductionResult {
  /** Amount of size reduced with unit */
  sizeReduced: string;
  /** Percentage of reduction */
  percentage: string;
}

interface FormatSizeOptions {
  /** Number of decimal places */
  decimals?: number;
  /** Use binary (1024) or decimal (1000) conversion */
  binary?: boolean;
}

/** Time-related types */
interface TimeUnit {
  value: number;
  singular: string;
  plural: string;
}

type TimeComponent = {
  value: number;
  unit: TimeUnit;
};

interface TimeFormatConfig {
  padHours?: boolean;
  padMinutes?: boolean;
  padSeconds?: boolean;
}

interface FormatTimeOptions {
  /** Use plural forms for units */
  usePlural?: boolean;
  /** Always show zero values */
  showZero?: boolean;
  /** Round to nearest second */
  shouldRound?: boolean;
}

// ============= Constants =============

/** Size-related constants */
const SIZE_UNITS = ["Bytes", "KB", "MB", "GB", "TB"] as const;

const SIZE_CONSTANTS = {
  BINARY_UNIT: 1024,
  DECIMAL_UNIT: 1000,
  DEFAULT_DECIMALS: 2,
  MIN_BYTES: 0,
} as const;

/** Time-related constants */
const TIME_UNITS: TimeUnit[] = [
  { value: 3600, singular: "hr", plural: "hrs" },
  { value: 60, singular: "min", plural: "mins" },
  { value: 1, singular: "sec", plural: "secs" },
] as const;

export const TIME_CONSTANTS = {
  SECONDS_PER_HOUR: TIME_UNITS[0].value,
  SECONDS_PER_MINUTE: TIME_UNITS[1].value,
} as const;

// ============= Size Formatting Functions =============

/**
 * Formats a number of bytes into a human-readable string
 */
export function bytesToSize(
  bytes: number,
  options: FormatSizeOptions = {}
): string {
  const { decimals = SIZE_CONSTANTS.DEFAULT_DECIMALS, binary = true } = options;

  if (bytes < SIZE_CONSTANTS.MIN_BYTES) {
    return `0 ${SIZE_UNITS[0]}`;
  }

  const unitSize = binary
    ? SIZE_CONSTANTS.BINARY_UNIT
    : SIZE_CONSTANTS.DECIMAL_UNIT;
  const unitIndex =
    bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(unitSize));
  const safeUnitIndex = Math.min(unitIndex, SIZE_UNITS.length - 1);
  const size = bytes / Math.pow(unitSize, safeUnitIndex);

  return `${size.toFixed(decimals)} ${SIZE_UNITS[safeUnitIndex]}`;
}

/**
 * Legacy bytes formatter with error handling
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes < 0) throw new Error("Bytes cannot be negative");
  if (bytes === 0) return "0 Bytes";

  const k = SIZE_CONSTANTS.BINARY_UNIT;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (i >= sizes.length) throw new Error("Value too large to format");

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${
    sizes[i]
  }`;
}

/**
 * Calculates the size of a Blob in human-readable format
 */
export function calculateBlobSize(
  blob?: Blob | null,
  options: FormatSizeOptions = {}
): string {
  return bytesToSize(blob?.size ?? 0, options);
}

/**
 * Calculates size reduction between original and reduced sizes
 */
export function calculateSizeReduction(
  originalBytes: number,
  reducedBlob?: Blob | null
): SizeReductionResult {
  if (originalBytes < SIZE_CONSTANTS.MIN_BYTES) {
    return { sizeReduced: bytesToSize(0), percentage: "0.00" };
  }

  const reducedSize = reducedBlob?.size ?? 0;
  const reducedBytes = Math.max(
    SIZE_CONSTANTS.MIN_BYTES,
    originalBytes - reducedSize
  );
  const percentage =
    reducedSize > 0 ? (reducedBytes / originalBytes) * 100 : 100;

  return {
    sizeReduced: bytesToSize(reducedBytes),
    percentage: percentage.toFixed(SIZE_CONSTANTS.DEFAULT_DECIMALS),
  };
}

// ============= Time Formatting Functions =============

/**
 * Formats seconds into digital format (HH:MM:SS)
 */
export function formatTimeDigital(
  seconds: number,
  config: TimeFormatConfig = {
    padHours: false,
    padMinutes: true,
    padSeconds: true,
  }
): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const padNum = (num: number, pad: boolean | undefined): string =>
    pad ?? false ? num.toString().padStart(2, "0") : num.toString();

  if (hours > 0) {
    return `${padNum(hours, config.padHours)}:${padNum(
      minutes,
      config.padMinutes
    )}:${padNum(remainingSeconds, config.padSeconds)}`;
  }

  return `${padNum(minutes, config.padMinutes)}:${padNum(
    remainingSeconds,
    config.padSeconds
  )}`;
}

/**
 * Formats seconds into human-readable format
 */
export function formatTimeHuman(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0 sec";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}hr`);
  if (minutes > 0) parts.push(`${minutes}min`);
  if (remainingSeconds > 0 || parts.length === 0)
    parts.push(`${remainingSeconds} sec`);

  return parts.join(" ");
}

/**
 * Advanced time formatter with additional options
 */
export function formatTimeAdvanced(
  seconds: number,
  options: FormatTimeOptions = {}
): string {
  const { usePlural = false, showZero = false, shouldRound = true } = options;

  if (!Number.isFinite(seconds) || seconds < 0) return "0 sec";

  const totalSeconds = shouldRound ? Math.round(seconds) : seconds;
  const components: TimeComponent[] = TIME_UNITS.map((unit) => ({
    value: Math.floor(totalSeconds / unit.value),
    unit,
  }));

  const parts: string[] = components
    .filter(({ value }) => value > 0 || (showZero && parts.length === 0))
    .map(({ value, unit }) => {
      const unitLabel = usePlural && value !== 1 ? unit.plural : unit.singular;
      return `${value} ${unitLabel}`;
    });

  return parts.length ? parts.join(" ") : `0 ${TIME_UNITS[2].singular}`;
}

// ============= Legacy/Compatibility Exports =============

export const reduceSize = calculateSizeReduction;
export const formatTime = formatTimeDigital;
export const formatedTime = formatTimeHuman;
export const formatedTimeHuman = formatTimeHuman;
