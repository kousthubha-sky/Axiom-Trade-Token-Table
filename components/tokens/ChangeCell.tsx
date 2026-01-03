"use client";

import { memo } from "react";
import { clampNumber, formatChange } from "@/lib/tokenFormatters";
import { cn } from "@/lib/cn";
import { CHANGE_COLORS } from "@/lib/constants";

interface ChangeCellProps {
  value: number;
}

export const ChangeCell = memo(function ChangeCell({ value }: ChangeCellProps) {
  const v = clampNumber(value);
  const isUp = v > 0;
  const isDown = v < 0;
  
  const colors = isUp ? CHANGE_COLORS.UP : isDown ? CHANGE_COLORS.DOWN : CHANGE_COLORS.FLAT;

  return (
    <div className="flex items-center justify-end tabular-nums">
      <span
        className={cn(
          "rounded-md px-2 py-1 text-xs font-medium border transition-colors duration-200",
          colors.border,
          colors.bg,
          colors.text
        )}
      >
        {formatChange(v)}
      </span>
    </div>
  );
});
