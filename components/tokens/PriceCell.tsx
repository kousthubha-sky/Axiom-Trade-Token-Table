"use client";

import { memo } from "react";
import { formatPrice, formatCompact } from "@/lib/tokenFormatters";
import { useAppSelector } from "@/lib/redux";

interface PriceCellProps {
  tokenId: string;
  price: number;
  marketCap: number;
}

export const PriceCell = memo(function PriceCell({ tokenId, price, marketCap }: PriceCellProps) {
  // Get latest price update for animation
  const priceUpdate = useAppSelector((state) => state.priceUpdates[tokenId]);
  const displayPrice = priceUpdate?.price ?? price;
  
  return (
    <div className="ml-auto">
      <div
        className="text-sm font-medium tabular-nums transition-colors duration-300"
        style={
          priceUpdate?.price
            ? {
                animation: 'priceFlash 300ms ease-out',
              }
            : undefined
        }
      >
        {formatPrice(displayPrice)}
      </div>
      <div className="mt-0.5 text-xs text-white/40 tabular-nums">
        MC: ${formatCompact(marketCap)}
      </div>
    </div>
  );
});
