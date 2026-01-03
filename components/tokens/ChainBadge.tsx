"use client";

import { memo } from "react";

export type ChainType = "SOL" | "ETH" | "BASE";

interface ChainBadgeProps {
  chain: ChainType;
}

export const ChainBadge = memo(function ChainBadge({ chain }: ChainBadgeProps) {
  const cls =
    chain === "SOL"
      ? "border-violet-500/25 bg-violet-500/10 text-violet-200"
      : chain === "BASE"
        ? "border-sky-500/25 bg-sky-500/10 text-sky-200"
        : "border-amber-500/25 bg-amber-500/10 text-amber-200";

  return (
    <span
      className={[
        "inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-medium",
        cls,
      ].join(" ")}
    >
      {chain}
    </span>
  );
});
