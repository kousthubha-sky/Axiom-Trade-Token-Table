"use client";

import { memo } from "react";

interface TokenSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TokenSearchBar = memo(function TokenSearchBar({
  value,
  onChange,
  placeholder = "Search by name, symbol, or address...",
}: TokenSearchBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:w-[420px]">
      <label className="text-xs font-medium text-white/50">Search (UI only)</label>
      <div className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-colors focus-within:border-white/20">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4 text-white/45"
          fill="none"
        >
          <path
            d="M9 15a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="m14 14 5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm text-white/90 placeholder:text-white/30 focus:outline-none"
        />
        <span className="hidden text-xs text-white/25 sm:inline-flex">
          ⌘K
        </span>
      </div>
    </div>
  );
});
