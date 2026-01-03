"use client";

import { memo } from "react";

export type TokenCategory = "new" | "final" | "migrated";

interface TabConfig {
  id: TokenCategory;
  label: string;
  hint: string;
}

interface TokenTabsProps {
  activeTab: TokenCategory;
  onTabChange: (tab: TokenCategory) => void;
  counts: Record<TokenCategory, number>;
}

const TABS: TabConfig[] = [
  { id: "new", label: "New pairs", hint: "Fresh listings & early momentum" },
  { id: "final", label: "Final Stretch", hint: "Near breakout / high activity" },
  { id: "migrated", label: "Migrated", hint: "Established pairs & migrated liquidity" },
];

export const TokenTabs = memo(function TokenTabs({
  activeTab,
  onTabChange,
  counts,
}: TokenTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={[
              "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "border-white/20 bg-white/10 text-white shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]"
                : "border-white/5 bg-white/[0.02] text-white/50 hover:border-white/10 hover:bg-white/5 hover:text-white/70",
            ].join(" ")}
          >
            <span>{tab.label}</span>
            <span
              className={[
                "inline-flex h-5 items-center justify-center rounded-full px-1.5 text-[11px]",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/40",
              ].join(" ")}
            >
              {counts[tab.id]}
            </span>
          </button>
        );
      })}
      <span className="ml-2 text-xs text-white/40">
        {TABS.find((t) => t.id === activeTab)?.hint}
      </span>
    </div>
  );
});
