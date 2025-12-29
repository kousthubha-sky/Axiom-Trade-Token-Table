"use client";

import { Component, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { setSearch, setTab, toggleSort, type TokenCategory, type SortKey } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/overlay";

type TokenCategory = "new" | "final" | "migrated";

type TokenRow = {
  id: string;
  category: TokenCategory;

  name: string;
  symbol: string;
  chain: "SOL" | "ETH" | "BASE";
  address: string; // UI-only
  age: string; // UI-only for now
  price: number;

  change5m: number;
  change1h: number;
  change24h: number;

  volume24h: number;
  liquidity: number;
  marketCap: number;

  txns24h: number;
  buys24h: number;
  sells24h: number;
};

type SortKey =
  | "name"
  | "price"
  | "change5m"
  | "change1h"
  | "change24h"
  | "volume24h"
  | "liquidity"
  | "marketCap"
  | "txns24h";

type SortDir = "asc" | "desc";

const TOKENS: TokenRow[] = [
  {
    id: "t_aurora",
    category: "new",
    name: "Aurora",
    symbol: "AUR",
    chain: "SOL",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    age: "2m",
    price: 0.00421,
    change5m: 12.4,
    change1h: 38.1,
    change24h: 221.2,
    volume24h: 1_420_000,
    liquidity: 214_000,
    marketCap: 3_200_000,
    txns24h: 18_420,
    buys24h: 10_980,
    sells24h: 7_440,
  },
  {
    id: "t_kumo",
    category: "new",
    name: "Kumo Cat",
    symbol: "KUMO",
    chain: "BASE",
    address: "0x2345678901bcdef12345678901bcdef123456789",
    age: "6m",
    price: 0.000093,
    change5m: -3.2,
    change1h: 19.7,
    change24h: 88.5,
    volume24h: 860_000,
    liquidity: 141_000,
    marketCap: 1_860_000,
    txns24h: 9_120,
    buys24h: 5_340,
    sells24h: 3_780,
  },
  {
    id: "t_lattice",
    category: "final",
    name: "Lattice",
    symbol: "LAT",
    chain: "SOL",
    address: "0x3456789012cdef123456789012cdef1234567890",
    age: "1h",
    price: 0.118,
    change5m: 0.6,
    change1h: 4.2,
    change24h: 31.9,
    volume24h: 5_920_000,
    liquidity: 1_120_000,
    marketCap: 18_400_000,
    txns24h: 44_110,
    buys24h: 25_010,
    sells24h: 19_100,
  },
  {
    id: "t_saffron",
    category: "final",
    name: "Saffron",
    symbol: "SAF",
    chain: "ETH",
    address: "0x4567890123def1234567890123def12345678901",
    age: "2h",
    price: 0.62,
    change5m: -0.9,
    change1h: 2.1,
    change24h: 11.2,
    volume24h: 2_210_000,
    liquidity: 980_000,
    marketCap: 42_000_000,
    txns24h: 12_904,
    buys24h: 6_330,
    sells24h: 6_574,
  },
  {
    id: "t_mosaic",
    category: "migrated",
    name: "Mosaic",
    symbol: "MOS",
    chain: "BASE",
    address: "0x5678901234ef12345678901234ef123456789012",
    age: "1d",
    price: 1.84,
    change5m: 0.1,
    change1h: -0.4,
    change24h: 6.8,
    volume24h: 12_440_000,
    liquidity: 4_210_000,
    marketCap: 320_000_000,
    txns24h: 91_430,
    buys24h: 46_900,
    sells24h: 44_530,
  },
  {
    id: "t_helios",
    category: "migrated",
    name: "Helios",
    symbol: "HEL",
    chain: "SOL",
    address: "0x6789012345f123456789012345f1234567890123",
    age: "4d",
    price: 0.094,
    change5m: -0.2,
    change1h: 0.8,
    change24h: -2.9,
    volume24h: 3_780_000,
    liquidity: 1_940_000,
    marketCap: 64_000_000,
    txns24h: 28_004,
    buys24h: 13_610,
    sells24h: 14_394,
  },
];

function clampNumber(n: number) {
  return Number.isFinite(n) ? n : 0;
}

function formatCompact(n: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(clampNumber(n));
}

function formatPrice(n: number) {
  const v = clampNumber(n);
  if (v === 0) return "$0";
  const decimals = v < 0.01 ? 6 : v < 1 ? 4 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: decimals,
  }).format(v);
}

function ChangeCell({ value }: { value: number }) {
  const v = clampNumber(value);
  const isUp = v > 0;
  const isDown = v < 0;

  return (
    <div className="flex items-center justify-end tabular-nums">
      <span
        className={[
          "rounded-md px-2 py-1 text-xs font-medium",
          "border",
          isUp
            ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
            : isDown
              ? "border-rose-500/25 bg-rose-500/10 text-rose-200"
              : "border-white/10 bg-white/5 text-white/70",
        ].join(" ")}
      >
        {v > 0 ? "+" : ""}
        {v.toFixed(1)}%
      </span>
    </div>
  );
}

function SortIcon({
  active,
  dir,
}: {
  active: boolean;
  dir: SortDir;
}) {
  const stroke = active ? "stroke-white/90" : "stroke-white/35";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M5.75 6.2 8 3.9l2.25 2.3"
        className={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={dir === "asc" && active ? 1 : 0.5}
      />
      <path
        d="M10.25 9.8 8 12.1 5.75 9.8"
        className={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={dir === "desc" && active ? 1 : 0.5}
      />
    </svg>
  );
}

function ChainPill({ chain }: { chain: TokenRow["chain"] }) {
  const cls =
    chain === "SOL"
      ? "border-violet-500/25 bg-violet-500/10 text-violet-200"
      : chain === "BASE"
        ? "border-sky-500/25 bg-sky-500/10 text-sky-200"
        : "border-amber-500/25 bg-amber-500/10 text-amber-200";

  return (
    <span className={["inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-medium", cls].join(" ")}>
      {chain}
    </span>
  );
}

function SkeletonRow() {
  // console.log("SkeletonRow rendered");
  return (
    <tr className="border-t border-white/5">
      <td className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03] shimmer" />
          <div className="min-w-0 flex-1">
            <div className="h-4 w-[180px] rounded-md bg-white/[0.03] shimmer" />
            <div className="mt-2 h-3 w-[240px] rounded-md bg-white/[0.03] shimmer" />
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-right sm:px-6">
        <div className="ml-auto h-4 w-[90px] rounded-md bg-white/[0.03] shimmer" />
        <div className="ml-auto mt-2 h-3 w-[70px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="px-4 py-4 sm:px-6">
        <div className="ml-auto h-7 w-[72px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="px-4 py-4 sm:px-6">
        <div className="ml-auto h-7 w-[72px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
        <div className="ml-auto h-7 w-[72px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="px-4 py-4 text-right sm:px-6">
        <div className="ml-auto h-4 w-[90px] rounded-md bg-white/[0.03] shimmer" />
        <div className="ml-auto mt-2 h-3 w-[70px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="hidden px-4 py-4 text-right md:table-cell md:px-6">
        <div className="ml-auto h-4 w-[90px] rounded-md bg-white/[0.03] shimmer" />
        <div className="ml-auto mt-2 h-3 w-[70px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="hidden px-4 py-4 text-right lg:table-cell lg:px-6">
        <div className="ml-auto h-4 w-[90px] rounded-md bg-white/[0.03] shimmer" />
        <div className="ml-auto mt-2 h-3 w-[70px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="hidden px-4 py-4 text-right xl:table-cell xl:px-6">
        <div className="ml-auto h-4 w-[90px] rounded-md bg-white/[0.03] shimmer" />
        <div className="ml-auto mt-2 h-3 w-[70px] rounded-md bg-white/[0.03] shimmer" />
      </td>
      <td className="hidden px-4 py-4 text-right xl:table-cell xl:px-6">
        <div className="ml-auto h-7 w-[120px] rounded-md bg-white/[0.03] shimmer" />
      </td>
    </tr>
  );
}

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

// NOTE: The ErrorBoundary above uses a minimal approach to avoid creating another file;
// it still functions as a client-side error boundary for this page.

async function fetchTokensMock(): Promise<TokenRow[]> {
  console.log("fetchTokensMock called");
  await new Promise((r) => setTimeout(r, 650));
  // occasional mock failure to exercise error UI (kept small)
  if (Math.random() < 0.06) throw new Error("Mock network error");
  console.log("fetchTokensMock returning TOKENS", { count: TOKENS.length });
  return TOKENS;
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

function copyText(text: string) {
  navigator.clipboard.writeText(text);
}

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const { tab, sortKey, sortDir, search } = useAppSelector((s) => s.tokensUi);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchTokensMock,
  });

  useEffect(() => {
    console.log("React Query state", {
      isLoading,
      isError,
      isFetching,
      error: error ? (error as Error).message : null,
      dataCount: data?.length ?? 0,
    });
  }, [data, isLoading, isError, isFetching, error]);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState<TokenRow | null>(null);

  function openDetails(t: TokenRow) {
    console.log("Details modal opened", { id: t.id, name: t.name, symbol: t.symbol });
    setSelected(t);
    setDetailsOpen(true);
  }

  const rows = useMemo(() => {
    const tokens = data ?? [];
    const q = search.trim().toLowerCase();

    const filtered = tokens
      .filter((t) => t.category === tab)
      .filter((t) => {
        if (!q) return true;
        return (
          t.name.toLowerCase().includes(q) ||
          t.symbol.toLowerCase().includes(q) ||
          t.address.toLowerCase().includes(q)
        );
      });

    const dir = sortDir === "asc" ? 1 : -1;

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name) * dir;
      const av = clampNumber(a[sortKey]);
      const bv = clampNumber(b[sortKey]);
      return (av - bv) * dir;
    });

    return sorted;
  }, [data, tab, sortKey, sortDir, search]);

  useEffect(() => {
    console.log("Rows computed", { tab, sortKey, sortDir, search, rows: rows.length });
  }, [rows, tab, sortKey, sortDir, search]);

  const tabs: Array<{ id: TokenCategory; label: string; hint: string }> = [
    { id: "new", label: "New pairs", hint: "Fresh listings & early momentum" },
    { id: "final", label: "Final Stretch", hint: "Near breakout / high activity" },
    { id: "migrated", label: "Migrated", hint: "Established pairs & migrated liquidity" },
  ];

  return (
    <TooltipProvider>
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

              <div className="flex flex-col gap-2 sm:w-[420px]">
                <label className="text-xs font-medium text-white/50">
                  Search (UI only)
                </label>
                <div className="group flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-colors focus-within:border-white/20">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-4 w-4 text-white/45"
                    fill="none"
                  >
                    <path
                      d="M9 15a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14 14l3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    aria-label="Search tokens"
                    placeholder="Search token, symbol, contract..."
                    value={search}
                    onChange={(e) => {
                      const next = e.target.value;
                      dispatch(setSearch(next));
                      console.log("Search input changed", { search: next });
                    }}
                    className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/35 outline-none"
                  />
                  <span className="hidden rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/60 sm:inline">
                    ⌘K
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="relative mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex w-full items-center gap-1 rounded-2xl border border-white/10 bg-black/20 p-1 sm:w-auto">
                {tabs.map((t) => {
                  const active = t.id === tab;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        dispatch(setTab(t.id));
                        console.log("Tab changed", { tab: t.id });
                      }}
                      className={[
                        "relative flex-1 rounded-xl px-3 py-2 text-sm font-medium transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                        active
                          ? "bg-white/10 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]"
                          : "text-white/60 hover:bg-white/[0.06] hover:text-white/85",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>{t.label}</span>
                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/65">
                          {(data ?? TOKENS).filter((x) => x.category === t.id).length}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-white/50">
                {tabs.find((t) => t.id === tab)?.hint}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
              <div className="text-sm font-medium text-white/80">
                Tokens
                <span className="ml-2 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60">
                  {tabs.find((t) => t.id === tab)?.label}
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
            </div>

            <ErrorBoundary>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-separate border-spacing-0">
                  <thead className="sticky top-0 z-10 bg-[#070A12]/85 backdrop-blur supports-[backdrop-filter]:bg-[#070A12]/55">
                    <tr className="text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
                      <th className="w-[320px] px-4 py-3 sm:px-6">
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(toggleSort("name"));
                            console.log("Sort column clicked", { clicked: "name", sortKey, sortDir });
                          }}
                          className="group inline-flex items-center gap-2"
                          aria-label="Sort by token name"
                        >
                          Token
                          <SortIcon active={sortKey === "name"} dir={sortDir} />
                          <span className="sr-only">
                            {sortKey === "name" ? `sorted ${sortDir}` : "not sorted"}
                          </span>
                        </button>
                      </th>

                      <th className="px-4 py-3 text-right sm:px-6">
                        <button
                          type="button"
                          onClick={() => dispatch(toggleSort("price"))}
                          className="group inline-flex items-center justify-end gap-2"
                          aria-label="Sort by price"
                        >
                          Price
                          <SortIcon active={sortKey === "price"} dir={sortDir} />
                        </button>
                      </th>

                      <th className="px-4 py-3 text-right sm:px-6">
                        <button
                          type="button"
                          onClick={() => dispatch(toggleSort("change5m"))}
                          className="group inline-flex items-center justify-end gap-2"
                          aria-label="Sort by 5m change"
                        >
                          5m
                          <SortIcon active={sortKey === "change5m"} dir={sortDir} />
                        </button>
                      </th>

                      <th className="px-4 py-3 text-right sm:px-6">
                        <button
                          type="button"
                          onClick={() => dispatch(toggleSort("change1h"))}
                          className="group inline-flex items-center justify-end gap-2"
                          aria-label="Sort by 1h change"
                        >
                          1h
                          <SortIcon active={sortKey === "change1h"} dir={sortDir} />
                        </button>
                      </th>

                      <th className="hidden px-4 py-3 text-right sm:table-cell sm:px-6">
                        <button
                          type="button"
                          onClick={() => dispatch(toggleSort("change24h"))}
                          className="group inline-flex items-center justify-end gap-2"
                          aria-label="Sort by 24h change"
                        >
                          24h
                          <SortIcon active={sortKey === "change24h"} dir={sortDir} />
                        </button>
                      </th>

                      <th className="px-4 py-3 text-right sm:px-6">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => dispatch(toggleSort("volume24h"))}
                              className="group inline-flex items-center justify-end gap-2"
                              aria-label="Sort by 24h volume"
                            >
                              Vol
                              <SortIcon active={sortKey === "volume24h"} dir={sortDir} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>24h trading volume</TooltipContent>
                        </Tooltip>
                      </th>

                      <th className="hidden px-4 py-3 text-right md:table-cell md:px-6">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => dispatch(toggleSort("liquidity"))}
                              className="group inline-flex items-center justify-end gap-2"
                              aria-label="Sort by liquidity"
                            >
                              Liq
                              <SortIcon active={sortKey === "liquidity"} dir={sortDir} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Liquidity currently in pools</TooltipContent>
                        </Tooltip>
                      </th>

                      <th className="hidden px-4 py-3 text-right lg:table-cell lg:px-6">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => dispatch(toggleSort("marketCap"))}
                              className="group inline-flex items-center justify-end gap-2"
                              aria-label="Sort by market cap"
                            >
                              MCap
                              <SortIcon active={sortKey === "marketCap"} dir={sortDir} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Market cap estimate</TooltipContent>
                        </Tooltip>
                      </th>

                      <th className="hidden px-4 py-3 text-right xl:table-cell xl:px-6">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => dispatch(toggleSort("txns24h" as SortKey))}
                              className="group inline-flex items-center justify-end gap-2"
                              aria-label="Sort by transactions"
                            >
                              Txns
                              <SortIcon active={sortKey === "txns24h"} dir={sortDir} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Number of swaps in 24h</TooltipContent>
                        </Tooltip>
                      </th>

                      <th className="hidden px-4 py-3 text-right xl:table-cell xl:px-6">
                        Buys / Sells
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-sm">
                    {isLoading ? (
                      <>
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
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
                    ) : rows.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="px-6 py-10 text-center text-sm text-white/55">
                          No matches.
                        </td>
                      </tr>
                    ) : (
                      rows.map((t) => (
                        <tr
                          key={t.id}
                          className={[
                            "group",
                            "border-t border-white/5",
                            "transition-colors",
                            "hover:bg-white/[0.035]",
                          ].join(" ")}
                        >
                          <td className="px-4 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0">
                                <div className="absolute inset-0 bg-[radial-gradient(20px_20px_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
                                <div className="relative flex h-full w-full items-center justify-center text-xs font-semibold text-white/70">
                                  {t.symbol.slice(0, 2)}
                                </div>
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => openDetails(t)}
                                    className="truncate text-left font-semibold text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                                    aria-label={`Open ${t.name} details`}
                                  >
                                    {t.name}
                                  </button>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="cursor-default">
                                        <ChainPill chain={t.chain} />
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Network: <span className="font-semibold text-white/90">{t.chain}</span>
                                    </TooltipContent>
                                  </Tooltip>

                                  <div className="ml-auto hidden sm:block">
                                    <Popover>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <PopoverTrigger asChild>
                                            <button
                                              type="button"
                                              className={[
                                                "inline-flex h-9 w-9 items-center justify-center rounded-xl",
                                                "border border-white/10 bg-white/[0.03] text-white/70",
                                                "opacity-0 transition",
                                                "group-hover:opacity-100 hover:bg-white/[0.06] hover:text-white/90",
                                                "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                                              ].join(" ")}
                                              aria-label="Open token actions"
                                            >
                                              <IconDots />
                                            </button>
                                          </PopoverTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>Actions</TooltipContent>
                                      </Tooltip>

                                      <PopoverContent>
                                        <div className="flex flex-col gap-1 p-1">
                                          <button
                                            type="button"
                                            onClick={() => copyText(t.address)}
                                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/[0.06] hover:text-white"
                                          >
                                            Copy address
                                          </button>
                                          <button
                                            type="button"
                                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/[0.06] hover:text-white"
                                          >
                                            View on explorer
                                          </button>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-xs text-white/50">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        type="button"
                                        onClick={() => copyText(t.address)}
                                        className="rounded-md border border-white/10 bg-black/20 px-2 py-0.5 hover:bg-white/[0.06] hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                                        aria-label={`Copy ${t.symbol} address`}
                                      >
                                        {t.symbol}
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Click to copy:{" "}
                                      <span className="font-semibold text-white/90">
                                        {shortAddress(t.address)}
                                      </span>
                                    </TooltipContent>
                                  </Tooltip>
                                  <span className="hidden sm:inline">• Trending on Pulse</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-right tabular-nums sm:px-6">
                            <div className="font-semibold text-white/90">
                              {formatPrice(t.price)}
                            </div>
                            <div className="mt-1 text-xs text-white/45">
                              ≈ {formatCompact(t.marketCap)} mcap
                            </div>
                          </td>

                          <td className="px-4 py-4 sm:px-6">
                            <ChangeCell value={t.change5m} />
                          </td>

                          <td className="px-4 py-4 sm:px-6">
                            <ChangeCell value={t.change1h} />
                          </td>

                          <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
                            <ChangeCell value={t.change24h} />
                          </td>

                          <td className="px-4 py-4 text-right tabular-nums sm:px-6">
                            <div className="font-semibold text-white/90">
                              {formatCompact(t.volume24h)}
                            </div>
                            <div className="mt-1 text-xs text-white/45">24h volume</div>
                          </td>

                          <td className="hidden px-4 py-4 text-right tabular-nums md:table-cell md:px-6">
                            <div className="font-semibold text-white/90">
                              {formatCompact(t.liquidity)}
                            </div>
                            <div className="mt-1 text-xs text-white/45">liquidity</div>
                          </td>

                          <td className="hidden px-4 py-4 text-right tabular-nums lg:table-cell lg:px-6">
                            <div className="font-semibold text-white/90">
                              {formatCompact(t.marketCap)}
                            </div>
                            <div className="mt-1 text-xs text-white/45">market cap</div>
                          </td>

                          <td className="hidden px-4 py-4 text-right tabular-nums xl:table-cell xl:px-6">
                            <div className="font-semibold text-white/90">
                              {formatCompact(t.txns24h)}
                            </div>
                            <div className="mt-1 text-xs text-white/45">24h txns</div>
                          </td>

                          <td className="hidden px-4 py-4 text-right tabular-nums xl:table-cell xl:px-6">
                            <div className="inline-flex items-center gap-2">
                              <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-200">
                                {formatCompact(t.buys24h)}
                              </span>
                              <span className="text-white/30">/</span>
                              <span className="rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-1 text-xs font-semibold text-rose-200">
                                {formatCompact(t.sells24h)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
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
        </div>

        {/* Details Modal */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent>
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <DialogTitle className="truncate text-base font-semibold text-white/90">
                  {selected ? (
                    <>
                      {selected.name} <span className="text-white/50">({selected.symbol})</span>
                    </>
                  ) : (
                    "Token"
                  )}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-white/55">
                  UI-only details modal (Step 3 adds query + redux + loading/error states).
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/[0.06] hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  aria-label="Close dialog"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </DialogClose>
            </div>
            {selected && (
              <div className="px-5 py-4 sm:px-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs font-medium text-white/50">Chain</div>
                    <div className="mt-1 flex items-center gap-2">
                      <ChainPill chain={selected.chain} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white/50">Price</div>
                    <div className="mt-1 font-semibold text-white/90">
                      {formatPrice(selected.price)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white/50">Market Cap</div>
                    <div className="mt-1 font-semibold text-white/90">
                      {formatCompact(selected.marketCap)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white/50">Liquidity</div>
                    <div className="mt-1 font-semibold text-white/90">
                      {formatCompact(selected.liquidity)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white/50">24h Volume</div>
                    <div className="mt-1 font-semibold text-white/90">
                      {formatCompact(selected.volume24h)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white/50">24h Transactions</div>
                    <div className="mt-1 font-semibold text-white/90">
                      {formatCompact(selected.txns24h)}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs font-medium text-white/50">Contract Address</div>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="rounded-md border border-white/10 bg-black/20 px-2 py-1 text-xs text-white/80">
                        {selected.address}
                      </code>
                      <button
                        type="button"
                        onClick={() => copyText(selected.address)}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-white/70 transition hover:bg-white/[0.06] hover:text-white/90"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
