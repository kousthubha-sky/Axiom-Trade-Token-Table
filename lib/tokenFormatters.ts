import { EXPLORER_BASE_URLS } from './constants';

/**
 * Clamp a number between 0 and Infinity, return 0 for non-finite values
 * @param n - Number to clamp
 * @returns Clamped number
 */
export function clampNumber(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, n);
}

/**
 * Format a number as a compact representation (1.2M, 340K, 50)
 * @param n - Number to format
 * @returns Formatted string
 */
export function formatCompact(n: number): string {
  const clamped = clampNumber(n);
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(clamped);
}

/**
 * Format a price with appropriate decimal places and currency symbol
 * - <0.01: 6 decimals
 * - <1: 4 decimals
 * - >=1: 2 decimals
 * @param n - Price to format
 * @returns Formatted price string
 */
export function formatPrice(n: number): string {
  const clamped = clampNumber(n);
  if (clamped === 0) return '$0.00';
  
  let decimals = 2;
  if (clamped < 0.01) decimals = 6;
  else if (clamped < 1) decimals = 4;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(clamped);
}

/**
 * Format a percentage change value with +/- prefix
 * @param value - Change percentage
 * @returns Formatted string (e.g., "+12.4%", "-3.2%")
 */
export function formatChange(value: number): string {
  const clamped = clampNumber(value);
  const sign = clamped > 0 ? '+' : clamped < 0 ? '-' : '';
  return `${sign}${Math.abs(clamped).toFixed(2)}%`;
}

/**
 * Shorten a blockchain address to 0x1234...5678 format
 * @param address - Full address
 * @returns Shortened address (defensive: returns full if too short)
 */
export function shortAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Get the appropriate blockchain explorer URL for a token
 * @param chain - The blockchain (SOL, ETH, or BASE)
 * @param address - The token contract address
 * @returns Full explorer URL
 */
export function getExplorerUrl(
  chain: 'SOL' | 'ETH' | 'BASE',
  address: string
): string {
  const baseUrl = EXPLORER_BASE_URLS[chain];
  return `${baseUrl}/${address}`;
}

/**
 * Get chain display name with proper capitalization
 * @param chain - The blockchain short code
 * @returns Display name
 */
export function getChainDisplayName(chain: string): string {
  const names: Record<string, string> = {
    SOL: 'Solana',
    ETH: 'Ethereum',
    BASE: 'Base',
  };
  return names[chain] || chain;
}
