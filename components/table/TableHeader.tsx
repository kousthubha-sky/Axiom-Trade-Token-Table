"use client";

import { memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/overlay";

export type SortDir = "asc" | "desc";

interface TableHeaderProps {
  label: string;
  sortKey: string;
  activeSortKey: string;
  sortDir: SortDir;
  onSort: () => void;
  align?: "left" | "right";
  tooltip?: string;
  className?: string;
}

function SortIcon({
  active,
  dir,
}: {
  active: boolean;
  dir: SortDir;
}) {
  const stroke = active ? "stroke-white/90" : "stroke-white/35";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M5.75 6.2 8 3.9l2.25 2.3"
        className={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={dir === "asc" && active ? 1 : 0.5}
      />
      <path
        d="M10.25 9.8 8 12.1 5.75 9.8"
        className={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={dir === "desc" && active ? 1 : 0.5}
      />
    </svg>
  );
}

export const TableHeader = memo(function TableHeader({
  label,
  sortKey,
  activeSortKey,
  sortDir,
  onSort,
  align = "left",
  tooltip,
  className = "",
}: TableHeaderProps) {
  const isActive = sortKey === activeSortKey;
  const buttonContent = (
    <button
      type="button"
      onClick={onSort}
      className={[
        "group inline-flex items-center gap-2 transition-colors hover:text-white/70",
        align === "right" ? "justify-end" : "",
      ].join(" ")}
      aria-label={`Sort by ${label}`}
    >
      {label}
      <SortIcon active={isActive} dir={sortDir} />
    </button>
  );

  return (
    <th
      className={[
        "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45",
        align === "right" ? "text-right" : "text-left",
        className,
      ].join(" ")}
    >
      {tooltip ? (
        <Tooltip>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      ) : (
        buttonContent
      )}
    </th>
  );
});
