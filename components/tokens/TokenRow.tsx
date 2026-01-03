"use client";

import { memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/overlay";
import { TokenCell } from "./TokenCell";
import { PriceCell } from "./PriceCell";
import { ChangeCell } from "./ChangeCell";
import { ChainBadge } from "./ChainBadge";
import { TokenActionsPopover } from "./TokenActionsPopover";
import { formatCompact, shortAddress } from "@/lib/tokenFormatters";
import { useAppSelector } from "@/lib/redux";
import type { TokenRow as TokenType } from "@/lib/types";

interface TokenRowProps {
  token: TokenType;
  onRowClick: (token: TokenType) => void;
  onCopyAddress: (address: string) => void;
}

function IconDots() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
      <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
      <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export const TokenRow = memo(function TokenRow({
  token,
  onRowClick,
  onCopyAddress,
}: TokenRowProps) {
  // Get latest updates for this token
  const priceUpdate = useAppSelector((state) => state.priceUpdates[token.id]);
  
  // Use updated values if available, otherwise use original
  const volume24h = priceUpdate?.volume24h ?? token.volume24h;
  const txns24h = priceUpdate?.txns24h ?? token.txns24h;
  const buys24h = priceUpdate?.buys24h ?? token.buys24h;
  const sells24h = priceUpdate?.sells24h ?? token.sells24h;
  
  return (
    <>
      <TokenCell className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0">
            <div className="absolute inset-0 bg-[radial-gradient(20px_20px_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
            <div className="relative flex h-full w-full items-center justify-center text-xs font-semibold text-white/70">
              {token.symbol.slice(0, 2)}
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onRowClick(token)}
                className="truncate text-left font-semibold text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                aria-label={`Open ${token.name} details`}
              >
                {token.name}
              </button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-default">
                    <ChainBadge chain={token.chain} />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  Network: <span className="font-semibold text-white/90">{token.chain}</span>
                </TooltipContent>
              </Tooltip>

              <div className="ml-auto hidden sm:block">
                <TokenActionsPopover
                  token={token}
                  onCopyAddress={onCopyAddress}
                />
              </div>
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-white/50">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onCopyAddress(token.address)}
                    className="rounded-md border border-white/10 bg-black/20 px-2 py-0.5 hover:bg-white/[0.06] hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                    aria-label={`Copy ${token.symbol} address`}
                  >
                    {token.symbol}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  Click to copy:{" "}
                  <span className="font-semibold text-white/90">
                    {shortAddress(token.address)}
                  </span>
                </TooltipContent>
              </Tooltip>
              <span className="hidden sm:inline">• Trending on Pulse</span>
            </div>
          </div>
        </div>
      </TokenCell>

      <TokenCell align="right">
        <div className="font-semibold text-white/90">
          <PriceCell tokenId={token.id} price={token.price} marketCap={token.marketCap} />
        </div>
      </TokenCell>

      <TokenCell>
        <ChangeCell tokenId={token.id} value={token.change5m} field="change5m" />
      </TokenCell>

      <TokenCell>
        <ChangeCell tokenId={token.id} value={token.change1h} field="change1h" />
      </TokenCell>

      <TokenCell className="hidden px-4 py-4 sm:table-cell sm:px-6">
        <ChangeCell tokenId={token.id} value={token.change24h} field="change24h" />
      </TokenCell>

      <TokenCell align="right">
        <div className="font-semibold text-white/90">
          {formatCompact(volume24h)}
        </div>
        <div className="mt-1 text-xs text-white/45">24h volume</div>
      </TokenCell>

      <TokenCell align="right" className="hidden md:table-cell md:px-6">
        <div className="font-semibold text-white/90">
          {formatCompact(token.liquidity)}
        </div>
        <div className="mt-1 text-xs text-white/45">liquidity</div>
      </TokenCell>

      <TokenCell align="right" className="hidden lg:table-cell lg:px-6">
        <div className="font-semibold text-white/90">
          {formatCompact(token.marketCap)}
        </div>
        <div className="mt-1 text-xs text-white/45">market cap</div>
      </TokenCell>

      <TokenCell align="right" className="hidden xl:table-cell xl:px-6">
        <div className="font-semibold text-white/90">
          {formatCompact(txns24h)}
        </div>
        <div className="mt-1 text-xs text-white/45">24h txns</div>
      </TokenCell>

      <TokenCell align="right" className="hidden xl:table-cell xl:px-6">
        <div className="inline-flex items-center gap-2">
          <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-200">
            {formatCompact(buys24h)}
          </span>
          <span className="text-white/30">/</span>
          <span className="rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-1 text-xs font-semibold text-rose-200">
            {formatCompact(sells24h)}
          </span>
        </div>
      </TokenCell>
    </>
  );
});
