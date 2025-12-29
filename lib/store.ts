import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

type TokensUiState = {
  tab: TokenCategory;
  sortKey: SortKey;
  sortDir: SortDir;
  search: string;
};

const initialState: TokensUiState = {
  tab: "new",
  sortKey: "volume24h",
  sortDir: "desc",
  search: "",
};

const tokensUiSlice = createSlice({
  name: "tokensUi",
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<TokenCategory>) {
      state.tab = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    toggleSort(state, action: PayloadAction<SortKey>) {
      const key = action.payload;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
        return;
      }
      state.sortKey = key;
      state.sortDir = "desc";
    },
  },
});

export const { setTab, setSearch, toggleSort } = tokensUiSlice.actions;

export const store = configureStore({
  reducer: {
    tokensUi: tokensUiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
