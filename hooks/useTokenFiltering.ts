import { useMemo } from 'react';
import type { TokenRow, TokenCategory } from '../lib/types';

/**
 * Hook for filtering tokens by category and search query.
 * 
 * @param tokens - Array of token data
 * @param searchQuery - Search query string
 * @param activeCategory - Current active category tab
 * @returns Filtered array of tokens
 * 
 * @remarks
 * - Search is case-insensitive
 * - Matches across token name, symbol, and address fields
 * - Category filtering is applied first, then search filtering
 */
export function useTokenFiltering(
  tokens: TokenRow[],
  searchQuery: string,
  activeCategory: TokenCategory
): TokenRow[] {
  return useMemo(() => {
    // Filter by category first
    const categoryFiltered = tokens.filter((t) => t.category === activeCategory);
    
    // Then filter by search (name, symbol, address)
    if (!searchQuery.trim()) return categoryFiltered;
    
    const query = searchQuery.toLowerCase();
    return categoryFiltered.filter((t) =>
      t.name.toLowerCase().includes(query) ||
      t.symbol.toLowerCase().includes(query) ||
      t.address.toLowerCase().includes(query)
    );
  }, [tokens, searchQuery, activeCategory]);
}
