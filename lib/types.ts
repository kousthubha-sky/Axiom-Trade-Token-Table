export type TokenCategory = "new" | "final" | "migrated";

export type SortKey =
  | "name"
  | "price"
  | "change5m"
  | "change1h"
  | "change24h"
  | "volume24h"
  | "liquidity"
  | "marketCap"
  | "txns24h";

export type SortDir = "asc" | "desc";

export type TokenRow = {
  id: string;
  category: TokenCategory;

  name: string;
  symbol: string;
  chain: "SOL" | "ETH" | "BASE";
  address: string;
  age: string;
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

/**
 * Redux UI state shape
 */
export type TokensUiState = {
  tab: TokenCategory;
  sortKey: SortKey;
  sortDir: SortDir;
  search: string;
};
