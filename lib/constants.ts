import type { TokenCategory } from './types';

/**
 * Tab configuration for token categories
 * Used by useTokenTabs hook and TokenTabs component
 */
export const TABS_CONFIG = [
  {
    id: 'new' as const,
    label: 'New pairs',
    hint: 'Fresh listings & early momentum',
  },
  {
    id: 'final' as const,
    label: 'Final Stretch',
    hint: 'Near breakout / high activity',
  },
  {
    id: 'migrated' as const,
    label: 'Migrated',
    hint: 'Established pairs & migrated liquidity',
  },
] as const satisfies Array<{ id: TokenCategory; label: string; hint: string }>;

/**
 * React Query configuration for token data fetching
 */
export const REACT_QUERY_CONFIG = {
  TOKENS_STALE_TIME: 30 * 1000, // 30 seconds
  TOKENS_CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  TOKENS_RETRY: 1,
} as const;

/**
 * Mock data fetch configuration
 */
export const MOCK_DATA_CONFIG = {
  FETCH_DELAY_MS: 650,
  FAILURE_RATE: 0.06, // 6% chance of error
} as const;

/**
 * UI animation timings (milliseconds)
 */
export const ANIMATION_TIMINGS = {
  COPY_FEEDBACK_DURATION: 1500,
  MODAL_CLOSE_DELAY: 300,
  TOOLTIP_DELAY_DURATION: 250,
  TOOLTIP_SKIP_DELAY_DURATION: 80,
} as const;

/**
 * Responsive breakpoints (Tailwind)
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

/**
 * Blockchain explorer URLs by chain
 */
export const EXPLORER_BASE_URLS = {
  SOL: 'https://solscan.io/token',
  ETH: 'https://etherscan.io/token',
  BASE: 'https://basescan.org/token',
} as const;

/**
 * Color configurations for chains
 */
export const CHAIN_COLORS = {
  SOL: { bg: 'bg-violet-500/10', border: 'border-violet-500/25', text: 'text-violet-200' },
  ETH: { bg: 'bg-amber-500/10', border: 'border-amber-500/25', text: 'text-amber-200' },
  BASE: { bg: 'bg-sky-500/10', border: 'border-sky-500/25', text: 'text-sky-200' },
} as const;

/**
 * Change indicator colors
 */
export const CHANGE_COLORS = {
  UP: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', text: 'text-emerald-200' },
  DOWN: { bg: 'bg-rose-500/10', border: 'border-rose-500/25', text: 'text-rose-200' },
  FLAT: { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white/70' },
} as const;
