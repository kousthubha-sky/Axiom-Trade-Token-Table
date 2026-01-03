import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/redux';
import { updateTokenPrices, clearPriceUpdates } from '@/lib/store';
import { startMockWebSocketStream } from '@/lib/mockWebSocket';
import type { TokenRow } from '@/lib/types';

/**
 * Hook to manage real-time price updates via mock WebSocket
 * - Connects to mock WebSocket on mount
 * - Dispatches Redux updates (batched)
 * - Cleans up on unmount
 * - Returns loading state
 *
 * Usage:
 * ```tsx
 * const { isUpdating } = useTokenPriceUpdates(tokens);
 * ```
 */
export function useTokenPriceUpdates(tokens: TokenRow[]) {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (tokens.length === 0) return;
    
    // Start mock WebSocket stream
    const unsubscribe = startMockWebSocketStream(
      tokens,
      1500, // Update every 1.5 seconds
      (updates) => {
        // Batch updates and dispatch to Redux
        const updateMap: Record<string, Partial<TokenRow>> = {};
        updates.forEach((update, tokenId) => {
          updateMap[tokenId] = update;
        });
        dispatch(updateTokenPrices(updateMap));
      }
    );
    
    return () => {
      unsubscribe();
      dispatch(clearPriceUpdates());
    };
  }, [tokens, dispatch]);
  
  return {
    isUpdating: true, // Mock always updating
  };
}
