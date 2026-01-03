/**
 * Merge Tailwind class names, filtering out falsy values
 * Similar to clsx or classnames, but minimal
 * @param parts - Class strings, booleans, undefined, null
 * @returns Merged class string
 */
export function cn(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}
