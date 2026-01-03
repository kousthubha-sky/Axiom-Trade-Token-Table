import { useMemo } from 'react';
import type { TokenRow, TokenCategory } from '../lib/types';

/**
 * Hook for counting tokens by category.
 * 
 * @param tokens - Array of token data
 * @returns Record with counts for each category
 * 
 * @remarks
 * - Returns counts for 'new', 'final', and 'migrated' categories
 * - Efficiently recomputes only when tokens array changes
 * - Useful for displaying tab counts in UI
 */
export function useTokenCount(tokens: TokenRow[]) {
  return useMemo(() => {
    const counts: Record<TokenCategory, number> = {
      new: 0,
      final: 0,
      migrated: 0,
    };
    
    tokens.forEach((token) => {
      counts[token.category]++;
    });
    
    return counts;
  }, [tokens]);
}
