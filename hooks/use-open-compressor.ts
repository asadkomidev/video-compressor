"use client";

import { useQueryState, parseAsBoolean } from "nuqs";

export const useOpenCompressor = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "compressor",
    parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close, setIsOpen };
};
