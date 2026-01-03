export function clampNumber(n: number) {
  return Number.isFinite(n) ? n : 0;
}

export function formatCompact(n: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(clampNumber(n));
}

export function formatPrice(n: number) {
  const v = clampNumber(n);
  if (v === 0) return "$0";
  const decimals = v < 0.01 ? 6 : v < 1 ? 4 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: decimals,
  }).format(v);
}

export function formatChange(value: number) {
  const v = clampNumber(value);
  return `${v > 0 ? "+" : ""}${v.toFixed(1)}%`;
}

export function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
