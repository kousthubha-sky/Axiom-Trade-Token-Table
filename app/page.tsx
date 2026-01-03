"use client";

import { Component } from "react";
import {
  useTokenData,
  useTokenFiltering,
  useTokenSorting,
  useTokenSearch,
  useTokenTabs,
  useTokenSort,
  useTokenDetails,
  useTokenCopy,
  useTokenCount,
} from '../hooks';
import { TOKENS } from '../lib/mockData';
import type { TokenRow } from '../lib/types';
import {
  TokenRow as TokenRowComponent,
  TokenSkeletonRow,
  TokenDetailsModal,
  TokenSearchBar,
  TokenTabs,
  TableContainer,
} from "../components";

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  override componentDidCatch() {
    // UI-only
  }
  override render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          Something went wrong rendering this section.
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Home() {
  // Data fetching
  const { data: rawTokens = TOKENS, isLoading, isFetching, isError, error, refetch } = useTokenData();
  
  // State management hooks
  const { search, setSearch } = useTokenSearch();
  const { activeTab, setTab, tabs } = useTokenTabs();
  const { sortKey, sortDir, toggleSort } = useTokenSort();
  const { open, selected, openDetails, closeDetails } = useTokenDetails();
  const { copyText } = useTokenCopy();
  const tokenCounts = useTokenCount(rawTokens);
  
  // Data processing hooks
  const filtered = useTokenFiltering(rawTokens, search, activeTab);
  const sorted = useTokenSorting(filtered, sortKey, sortDir);

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <div className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6">
        {/* Top bar */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_10%_0%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(700px_300px_at_85%_10%,rgba(34,211,238,0.14),transparent_55%)]" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                    <path
                      d="M4 14.2c2.2-1.8 4.3-2.7 6.3-2.7 3.1 0 5.5 2.2 8.7 2.2 1 0 2.1-.2 3-.7"
                      stroke="rgba(255,255,255,.9)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 18.3c2.3-1.4 4.6-2.1 6.9-2.1 3.3 0 5.9 1.6 9.1 1.6 1 0 2-.1 3-.5"
                      stroke="rgba(255,255,255,.6)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 10.1C6.1 7.4 8.3 6 10.8 6c3.5 0 6.1 3.1 9.8 3.1.6 0 1.2-.1 1.8-.3"
                      stroke="rgba(255,255,255,.35)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    Pulse
                  </h1>
                  <p className="mt-1 text-sm text-white/60">
                    Token discovery table • UI-only replica (Step 1)
                  </p>
                </div>
              </div>
            </div>

            <TokenSearchBar />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-5">
          <TokenTabs
            activeTab={activeTab}
            onTabChange={setTab}
            counts={tokenCounts}
          />
        </div>

        {/* Table */}
        <ErrorBoundary>
          <TableContainer
            header={
              <>
                <div className="text-sm font-medium text-white/80">
                  Tokens
                  <span className="ml-2 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60">
                    {activeTab}
                  </span>
                  {isFetching ? (
                    <span className="ml-2 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60">
                      Updating…
                    </span>
                  ) : null}
                </div>

                <div className="hidden items-center gap-2 text-xs text-white/50 sm:flex">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    Up
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                    Down
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-white/25" />
                    Flat
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isError ? (
                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/[0.07]"
                    >
                      Retry
                    </button>
                  ) : null}
                </div>
              </>
            }
          >
            <table className="w-full min-w-[980px] border-separate border-spacing-0">
              <thead className="sticky top-0 z-10 bg-[#070A12]/85 backdrop-blur supports-[backdrop-filter]:bg-[#070A12]/55">
                <tr className="text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
                  <th className="w-[320px] px-4 py-3 sm:px-6">
                    <button
                      type="button"
                      onClick={() => toggleSort("name")}
                      className="group inline-flex items-center gap-2"
                      aria-label="Sort by token name"
                    >
                      Token
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M5.75 6.2 8 3.9l2.25 2.3"
                          className={sortKey === "name" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "asc" && sortKey === "name" ? 1 : 0.5}
                        />
                        <path
                          d="M10.25 9.8 8 12.1 5.75 9.8"
                          className={sortKey === "name" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "desc" && sortKey === "name" ? 1 : 0.5}
                        />
                      </svg>
                      <span className="sr-only">
                        {sortKey === "name" ? `sorted ${sortDir}` : "not sorted"}
                      </span>
                    </button>
                  </th>

                  <th className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => toggleSort("price")}
                      className="group inline-flex items-center justify-end gap-2"
                      aria-label="Sort by price"
                    >
                      Price
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M5.75 6.2 8 3.9l2.25 2.3"
                          className={sortKey === "price" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "asc" && sortKey === "price" ? 1 : 0.5}
                        />
                        <path
                          d="M10.25 9.8 8 12.1 5.75 9.8"
                          className={sortKey === "price" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "desc" && sortKey === "price" ? 1 : 0.5}
                        />
                      </svg>
                    </button>
                  </th>

                  <th className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => toggleSort("change5m")}
                      className="group inline-flex items-center justify-end gap-2"
                      aria-label="Sort by 5m change"
                    >
                      5m
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M5.75 6.2 8 3.9l2.25 2.3"
                          className={sortKey === "change5m" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "asc" && sortKey === "change5m" ? 1 : 0.5}
                        />
                        <path
                          d="M10.25 9.8 8 12.1 5.75 9.8"
                          className={sortKey === "change5m" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "desc" && sortKey === "change5m" ? 1 : 0.5}
                        />
                      </svg>
                    </button>
                  </th>

                  <th className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => toggleSort("change1h")}
                      className="group inline-flex items-center justify-end gap-2"
                      aria-label="Sort by 1h change"
                    >
                      1h
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M5.75 6.2 8 3.9l2.25 2.3"
                          className={sortKey === "change1h" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "asc" && sortKey === "change1h" ? 1 : 0.5}
                        />
                        <path
                          d="M10.25 9.8 8 12.1 5.75 9.8"
                          className={sortKey === "change1h" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "desc" && sortKey === "change1h" ? 1 : 0.5}
                        />
                      </svg>
                    </button>
                  </th>

                  <th className="hidden px-4 py-3 text-right sm:table-cell sm:px-6">
                    <button
                      type="button"
                      onClick={() => toggleSort("change24h")}
                      className="group inline-flex items-center justify-end gap-2"
                      aria-label="Sort by 24h change"
                    >
                      24h
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M5.75 6.2 8 3.9l2.25 2.3"
                          className={sortKey === "change24h" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "asc" && sortKey === "change24h" ? 1 : 0.5}
                        />
                        <path
                          d="M10.25 9.8 8 12.1 5.75 9.8"
                          className={sortKey === "change24h" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "desc" && sortKey === "change24h" ? 1 : 0.5}
                        />
                      </svg>
                    </button>
                  </th>

                  <th className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => toggleSort("volume24h")}
                      className="group inline-flex items-center justify-end gap-2"
                      aria-label="Sort by 24h volume"
                    >
                      Vol
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M5.75 6.2 8 3.9l2.25 2.3"
                          className={sortKey === "volume24h" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "asc" && sortKey === "volume24h" ? 1 : 0.5}
                        />
                        <path
                          d="M10.25 9.8 8 12.1 5.75 9.8"
                          className={sortKey === "volume24h" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "desc" && sortKey === "volume24h" ? 1 : 0.5}
                        />
                      </svg>
                    </button>
                  </th>

                  <th className="hidden px-4 py-3 text-right md:table-cell md:px-6">
                    <button
                      type="button"
                      onClick={() => toggleSort("liquidity")}
                      className="group inline-flex items-center justify-end gap-2"
                      aria-label="Sort by liquidity"
                    >
                      Liq
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M5.75 6.2 8 3.9l2.25 2.3"
                          className={sortKey === "liquidity" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "asc" && sortKey === "liquidity" ? 1 : 0.5}
                        />
                        <path
                          d="M10.25 9.8 8 12.1 5.75 9.8"
                          className={sortKey === "liquidity" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "desc" && sortKey === "liquidity" ? 1 : 0.5}
                        />
                      </svg>
                    </button>
                  </th>

                  <th className="hidden px-4 py-3 text-right lg:table-cell lg:px-6">
                    <button
                      type="button"
                      onClick={() => toggleSort("marketCap")}
                      className="group inline-flex items-center justify-end gap-2"
                      aria-label="Sort by market cap"
                    >
                      MCap
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M5.75 6.2 8 3.9l2.25 2.3"
                          className={sortKey === "marketCap" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "asc" && sortKey === "marketCap" ? 1 : 0.5}
                        />
                        <path
                          d="M10.25 9.8 8 12.1 5.75 9.8"
                          className={sortKey === "marketCap" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "desc" && sortKey === "marketCap" ? 1 : 0.5}
                        />
                      </svg>
                    </button>
                  </th>

                  <th className="hidden px-4 py-3 text-right xl:table-cell xl:px-6">
                    <button
                      type="button"
                      onClick={() => toggleSort("txns24h")}
                      className="group inline-flex items-center justify-end gap-2"
                      aria-label="Sort by transactions"
                    >
                      Txns
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M5.75 6.2 8 3.9l2.25 2.3"
                          className={sortKey === "txns24h" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "asc" && sortKey === "txns24h" ? 1 : 0.5}
                        />
                        <path
                          d="M10.25 9.8 8 12.1 5.75 9.8"
                          className={sortKey === "txns24h" ? "stroke-white/90" : "stroke-white/35"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={sortDir === "desc" && sortKey === "txns24h" ? 1 : 0.5}
                        />
                      </svg>
                    </button>
                  </th>

                  <th className="hidden px-4 py-3 text-right xl:table-cell xl:px-6">
                    Buys / Sells
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {isLoading ? (
                  <>
                    <TokenSkeletonRow />
                    <TokenSkeletonRow />
                    <TokenSkeletonRow />
                    <TokenSkeletonRow />
                    <TokenSkeletonRow />
                    <TokenSkeletonRow />
                  </>
                ) : isError ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-10">
                      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4">
                        <div className="text-sm font-semibold text-rose-200">Failed to load tokens</div>
                        <div className="mt-1 text-sm text-rose-200/70">
                          {(error as Error | null)?.message ?? "Unknown error"}
                        </div>
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => refetch()}
                            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/[0.07]"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : sorted.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-10 text-center text-sm text-white/55">
                      No matches.
                    </td>
                  </tr>
                ) : (
                  sorted.map((t) => (
                    <tr
                      key={t.id}
                      className={[
                        "group",
                        "border-t border-white/5",
                        "transition-colors",
                        "hover:bg-white/[0.035]",
                      ].join(" ")}
                    >
                      <TokenRowComponent
                        token={t}
                        onRowClick={openDetails}
                        onCopyAddress={copyText}
                      />
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TableContainer>
        </ErrorBoundary>

        <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">
              Tip
            </span>
            <span>
              Click column headers to sort (client-side only for now).
            </span>
          </div>
          <div className="text-white/40">
            Responsive: hides columns progressively down to 320px; scrolls horizontally.
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <TokenDetailsModal
        open={open}
        onOpenChange={closeDetails}
        token={selected}
        onCopyAddress={copyText}
      />
    </div>
  );
}
