import { useMemo } from 'react';
import type { TokenRow, SortKey, SortDir } from '../lib/types';

/**
 * Hook for sorting tokens by a specified key and direction.
 * 
 * @param tokens - Array of token data to sort
 * @param sortKey - Key to sort by
 * @param sortDir - Sort direction ('asc' or 'desc')
 * @returns Sorted array of tokens
 * 
 * @remarks
 * - Numeric fields are sorted numerically
 * - String fields (name) are sorted lexicographically using localeCompare
 * - Sorting is stable (preserves order of equal elements)
 * - All comparisons are case-insensitive for string fields
 */
export function useTokenSorting(
  tokens: TokenRow[],
  sortKey: SortKey,
  sortDir: SortDir
): TokenRow[] {
  return useMemo(() => {
    const sorted = [...tokens].sort((a, b) => {
      // Handle numeric vs string sorting
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      // String comparison
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortDir === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
    
    return sorted;
  }, [tokens, sortKey, sortDir]);
}
