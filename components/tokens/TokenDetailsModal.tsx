"use client";

import { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/overlay";
import { formatPrice, formatCompact, formatChange, shortAddress } from "@/lib/tokenFormatters";
import type { TokenRow as TokenType } from "@/lib/types";

interface TokenDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: TokenType | null;
  onCopyAddress: (address: string) => void;
}

export const TokenDetailsModal = memo(function TokenDetailsModal({
  open,
  onOpenChange,
  token,
  onCopyAddress,
}: TokenDetailsModalProps) {
  if (!token) return null;

  const getExplorerUrl = () => {
    const baseUrl =
      token.chain === "SOL"
        ? "https://solscan.io/token"
        : token.chain === "BASE"
          ? "https://basescan.org/token"
          : "https://etherscan.io/token";
    return `${baseUrl}/${token.address}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <DialogTitle className="text-xl">{token.name}</DialogTitle>
            <DialogDescription className="mt-1">
              {token.symbol} • {token.chain}
            </DialogDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold tabular-nums">
              {formatPrice(token.price)}
            </div>
            <div className="text-sm text-white/60 tabular-nums">
              {formatCompact(token.marketCap)} market cap
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <div className="text-xs font-medium text-white/50">5m Change</div>
            <div className="mt-1 text-sm tabular-nums">{formatChange(token.change5m)}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-white/50">1h Change</div>
            <div className="mt-1 text-sm tabular-nums">{formatChange(token.change1h)}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-white/50">24h Change</div>
            <div className="mt-1 text-sm tabular-nums">{formatChange(token.change24h)}</div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <h3 className="mb-4 text-sm font-medium text-white/70">Market Data</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs font-medium text-white/50">24h Volume</div>
              <div className="mt-1 text-sm tabular-nums">${formatCompact(token.volume24h)}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-white/50">Liquidity</div>
              <div className="mt-1 text-sm tabular-nums">${formatCompact(token.liquidity)}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-white/50">24h Transactions</div>
              <div className="mt-1 text-sm tabular-nums">{formatCompact(token.txns24h)}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-white/50">Age</div>
              <div className="mt-1 text-sm">{token.age}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <h3 className="mb-4 text-sm font-medium text-white/70">Buy/Sell Ratio</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs font-medium text-white/50">24h Buys</div>
              <div className="mt-1 text-sm tabular-nums text-emerald-200">
                {formatCompact(token.buys24h)}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-white/50">24h Sells</div>
              <div className="mt-1 text-sm tabular-nums text-rose-200">
                {formatCompact(token.sells24h)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <h3 className="mb-3 text-sm font-medium text-white/70">Contract Address</h3>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm font-mono text-white/70">
              {token.address}
            </code>
            <button
              onClick={() => onCopyAddress(token.address)}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <a
            href={getExplorerUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View on explorer
          </a>
          <DialogClose className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/15">
            Close
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
});
