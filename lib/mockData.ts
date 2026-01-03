import type { TokenRow } from "./types";
import { MOCK_DATA_CONFIG } from "./constants";

/**
 * Mock token data for development/testing
 */
export const TOKENS: TokenRow[] = [
  {
    id: "t_aurora",
    category: "new",
    name: "Aurora",
    symbol: "AUR",
    chain: "SOL",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    age: "2m",
    price: 0.00421,
    change5m: 12.4,
    change1h: 38.1,
    change24h: 221.2,
    volume24h: 1_420_000,
    liquidity: 214_000,
    marketCap: 3_200_000,
    txns24h: 18_420,
    buys24h: 10_980,
    sells24h: 7_440,
  },
  {
    id: "t_kumo",
    category: "new",
    name: "Kumo Cat",
    symbol: "KUMO",
    chain: "BASE",
    address: "0x2345678901bcdef12345678901bcdef123456789",
    age: "6m",
    price: 0.000093,
    change5m: -3.2,
    change1h: 19.7,
    change24h: 88.5,
    volume24h: 860_000,
    liquidity: 141_000,
    marketCap: 1_860_000,
    txns24h: 9_120,
    buys24h: 5_340,
    sells24h: 3_780,
  },
  {
    id: "t_lattice",
    category: "final",
    name: "Lattice",
    symbol: "LAT",
    chain: "SOL",
    address: "0x3456789012cdef123456789012cdef1234567890",
    age: "1h",
    price: 0.118,
    change5m: 0.6,
    change1h: 4.2,
    change24h: 31.9,
    volume24h: 5_920_000,
    liquidity: 1_120_000,
    marketCap: 18_400_000,
    txns24h: 44_110,
    buys24h: 25_010,
    sells24h: 19_100,
  },
  {
    id: "t_saffron",
    category: "final",
    name: "Saffron",
    symbol: "SAF",
    chain: "ETH",
    address: "0x4567890123def1234567890123def12345678901",
    age: "2h",
    price: 0.62,
    change5m: -0.9,
    change1h: 2.1,
    change24h: 11.2,
    volume24h: 2_210_000,
    liquidity: 980_000,
    marketCap: 42_000_000,
    txns24h: 12_904,
    buys24h: 6_330,
    sells24h: 6_574,
  },
  {
    id: "t_mosaic",
    category: "migrated",
    name: "Mosaic",
    symbol: "MOS",
    chain: "BASE",
    address: "0x5678901234ef12345678901234ef123456789012",
    age: "1d",
    price: 1.84,
    change5m: 0.1,
    change1h: -0.4,
    change24h: 6.8,
    volume24h: 12_440_000,
    liquidity: 4_210_000,
    marketCap: 320_000_000,
    txns24h: 91_430,
    buys24h: 46_900,
    sells24h: 44_530,
  },
  {
    id: "t_helios",
    category: "migrated",
    name: "Helios",
    symbol: "HEL",
    chain: "SOL",
    address: "0x6789012345f123456789012345f1234567890123",
    age: "4d",
    price: 0.094,
    change5m: -0.2,
    change1h: 0.8,
    change24h: -2.9,
    volume24h: 3_780_000,
    liquidity: 1_940_000,
    marketCap: 64_000_000,
    txns24h: 28_004,
    buys24h: 13_610,
    sells24h: 14_394,
  },
];

/**
 * Fetch mock token data with simulated network delay and occasional errors
 * @param delayMs - Optional delay in milliseconds (defaults to MOCK_DATA_CONFIG.FETCH_DELAY_MS)
 * @throws Error on simulated network failure (MOCK_DATA_CONFIG.FAILURE_RATE chance)
 * @returns Promise resolving to token array
 */
export async function fetchTokensMock(delayMs = MOCK_DATA_CONFIG.FETCH_DELAY_MS): Promise<TokenRow[]> {
  console.log("fetchTokensMock called");
  await new Promise((r) => setTimeout(r, delayMs));
  
  // Simulate occasional network error
  if (Math.random() < MOCK_DATA_CONFIG.FAILURE_RATE) {
    throw new Error("Mock network error");
  }
  
  console.log("fetchTokensMock returning TOKENS", { count: TOKENS.length });
  return TOKENS;
}
