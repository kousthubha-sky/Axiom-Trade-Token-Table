"use client";

import { memo } from "react";
import { formatPrice, formatCompact } from "@/lib/tokenFormatters";

interface PriceCellProps {
  price: number;
  marketCap: number;
}

export const PriceCell = memo(function PriceCell({ price, marketCap }: PriceCellProps) {
  return (
    <div className="ml-auto">
      <div className="text-sm font-medium tabular-nums">{formatPrice(price)}</div>
      <div className="mt-0.5 text-xs text-white/40 tabular-nums">
        MC: ${formatCompact(marketCap)}
      </div>
    </div>
  );
});
