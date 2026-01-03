"use client";

import { memo } from "react";
import { cn } from "@/lib/cn";
import { CHAIN_COLORS } from "@/lib/constants";

export type ChainType = "SOL" | "ETH" | "BASE";

interface ChainBadgeProps {
  chain: ChainType;
}

export const ChainBadge = memo(function ChainBadge({ chain }: ChainBadgeProps) {
  const colors = CHAIN_COLORS[chain];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-medium",
        colors.border,
        colors.bg,
        colors.text
      )}
    >
      {chain}
    </span>
  );
});
