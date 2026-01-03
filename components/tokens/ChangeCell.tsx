"use client";

import { memo } from "react";
import { clampNumber, formatChange } from "@/lib/tokenFormatters";
import { cn } from "@/lib/cn";
import { CHANGE_COLORS } from "@/lib/constants";
import { useAppSelector } from "@/lib/redux";

interface ChangeCellProps {
  tokenId: string;
  value: number;
  field: 'change5m' | 'change1h' | 'change24h';
}

export const ChangeCell = memo(function ChangeCell({ tokenId, value, field }: ChangeCellProps) {
  const priceUpdate = useAppSelector((state) => state.priceUpdates[tokenId]);
  const displayValue = priceUpdate?.[field] ?? value;
  
  const v = clampNumber(displayValue);
  const isUp = v > 0;
  const isDown = v < 0;
  
  const colors = isUp ? CHANGE_COLORS.UP : isDown ? CHANGE_COLORS.DOWN : CHANGE_COLORS.FLAT;
  
  // Show animation if this metric was just updated
  const hasUpdate = priceUpdate?.[field] !== undefined;

  return (
    <div className="flex items-center justify-end tabular-nums">
      <span
        className={cn(
          "rounded-md px-2 py-1 text-xs font-medium border transition-colors duration-300",
          colors.border,
          colors.bg,
          colors.text,
          hasUpdate && "animate-pulse"
        )}
      >
        {formatChange(v)}
      </span>
    </div>
  );
});
