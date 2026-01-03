import { useQuery } from '@tanstack/react-query';
import { fetchTokensMock, MOCK_DATA_CONFIG, REACT_QUERY_CONFIG } from '../lib';
import type { TokenRow } from '../lib/types';

/**
 * Hook for fetching token data using React Query with mock data.
 * 
 * @param delayMs - Delay in milliseconds for the mock fetch (defaults to MOCK_DATA_CONFIG.FETCH_DELAY_MS)
 * @returns Object containing query state and functions
 * 
 * @remarks
 * - Uses React Query's useQuery hook for data fetching
 * - Configured with stale time, cache time, and retry from REACT_QUERY_CONFIG
 * - Returns loading, error, and refetch states
 */
export function useTokenData(delayMs = MOCK_DATA_CONFIG.FETCH_DELAY_MS) {
  const query = useQuery<TokenRow[], Error>({
    queryKey: ['tokens', delayMs],
    queryFn: () => fetchTokensMock(delayMs),
    staleTime: REACT_QUERY_CONFIG.TOKENS_STALE_TIME,
    gcTime: REACT_QUERY_CONFIG.TOKENS_CACHE_TIME,
    retry: REACT_QUERY_CONFIG.TOKENS_RETRY,
  });
  
  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
