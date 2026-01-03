"use client";

import { memo } from "react";
import { clampNumber, formatChange } from "@/lib/tokenFormatters";

interface ChangeCellProps {
  value: number;
}

export const ChangeCell = memo(function ChangeCell({ value }: ChangeCellProps) {
  const v = clampNumber(value);
  const isUp = v > 0;
  const isDown = v < 0;

  return (
    <div className="flex items-center justify-end tabular-nums">
      <span
        className={[
          "rounded-md px-2 py-1 text-xs font-medium",
          "border",
          "transition-colors duration-200",
          isUp
            ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
            : isDown
              ? "border-rose-500/25 bg-rose-500/10 text-rose-200"
              : "border-white/10 bg-white/5 text-white/70",
        ].join(" ")}
      >
        {formatChange(v)}
      </span>
    </div>
  );
});
