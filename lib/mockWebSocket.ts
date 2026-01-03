import type { TokenRow } from './types';

/**
 * Simulates real-time price/volume changes for a token
 * @param token - Token to update
 * @returns Updated token with realistic deltas
 */
export function simulateTokenUpdate(token: TokenRow): Partial<TokenRow> {
  // Price change: ±0.5% to ±3%
  const priceMultiplier = 1 + (Math.random() - 0.5) * 0.06;
  const newPrice = Math.max(0.00001, token.price * priceMultiplier);
  
  // Change 5m: ±0.5 to ±5
  const change5m = token.change5m + (Math.random() - 0.5) * 10;
  
  // Change 1h: ±1 to ±10
  const change1h = token.change1h + (Math.random() - 0.5) * 20;
  
  // Volume: ±5% to ±15%
  const volumeMultiplier = 1 + (Math.random() - 0.5) * 0.2;
  const volume24h = token.volume24h * volumeMultiplier;
  
  // Transaction counts: ±1 to ±10
  const txns24h = token.txns24h + Math.round((Math.random() - 0.5) * 20);
  const buys24h = Math.round(txns24h * 0.55 + (Math.random() - 0.5) * 10);
  const sells24h = txns24h - buys24h;
  
  return {
    price: newPrice,
    change5m,
    change1h,
    volume24h,
    txns24h: Math.max(0, txns24h),
    buys24h: Math.max(0, buys24h),
    sells24h: Math.max(0, sells24h),
  };
}

/**
 * Simulates continuous WebSocket stream
 * Yields token updates at regular intervals
 * @param tokens - Initial token list
 * @param intervalMs - Update interval (default 1500ms)
 * @param onUpdate - Callback for each batch of updates
 * @returns Cleanup function to stop updates
 */
export function startMockWebSocketStream(
  tokens: TokenRow[],
  intervalMs: number = 1500,
  onUpdate: (updates: Map<string, Partial<TokenRow>>) => void
): () => void {
  const interval = setInterval(() => {
    const updates = new Map<string, Partial<TokenRow>>();
    
    // Update 40-60% of tokens per batch
    const updateCount = Math.floor(tokens.length * (0.4 + Math.random() * 0.2));
    const tokensToUpdate = tokens
      .sort(() => Math.random() - 0.5)
      .slice(0, updateCount);
    
    tokensToUpdate.forEach((token) => {
      updates.set(token.id, simulateTokenUpdate(token));
    });
    
    onUpdate(updates);
  }, intervalMs);
  
  return () => clearInterval(interval);
}
