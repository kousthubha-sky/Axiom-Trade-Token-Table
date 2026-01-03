"use client";

import { memo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/overlay";
import { getExplorerUrl } from "@/lib/tokenFormatters";
import { ANIMATION_TIMINGS } from "@/lib/constants";
import type { TokenRow as TokenType } from "@/lib/types";

interface TokenActionsPopoverProps {
  token: TokenType;
  onCopyAddress: (address: string) => void;
}

export const TokenActionsPopover = memo(function TokenActionsPopover({
  token,
  onCopyAddress,
}: TokenActionsPopoverProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyAddress(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), ANIMATION_TIMINGS.COPY_FEEDBACK_DURATION);
  };

  return (
    <Popover>
      <PopoverTrigger className="hidden group-hover:block focus:outline-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white/70">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
            <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
            <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-2">
        <button
          onClick={handleCopy}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>{copied ? "Copied!" : "Copy address"}</span>
        </button>
        <a
          href={getExplorerUrl(token.chain, token.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          <span>View on explorer</span>
        </a>
      </PopoverContent>
    </Popover>
  );
});
