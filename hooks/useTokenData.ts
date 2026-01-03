import { useQuery } from '@tanstack/react-query';
import { fetchTokensMock } from '../lib/mockData';
import type { TokenRow } from '../lib/types';

/**
 * Hook for fetching token data using React Query with mock data.
 * 
 * @param delayMs - Delay in milliseconds for the mock fetch (default: 650)
 * @returns Object containing query state and functions
 * 
 * @remarks
 * - Uses React Query's useQuery hook for data fetching
 * - Configured with 30 second stale time and 5 minute cache time
 * - Retries once on failure
 * - Returns loading, error, and refetch states
 */
export function useTokenData(delayMs = 650) {
  const query = useQuery<TokenRow[], Error>({
    queryKey: ['tokens', delayMs],
    queryFn: () => fetchTokensMock(delayMs),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
    retry: 1,
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
