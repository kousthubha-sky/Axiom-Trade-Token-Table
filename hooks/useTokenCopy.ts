import { useState } from 'react';

/**
 * Hook for copy-to-clipboard functionality with feedback.
 * 
 * @returns Object containing copy function and copied state
 * 
 * @remarks
 * - Uses navigator.clipboard API for copying text
 * - Provides visual feedback through isCopied state
 * - Automatically resets copied state after 1.5 seconds
 * - Error handling for clipboard write failures
 */
export function useTokenCopy() {
  const [isCopied, setIsCopied] = useState(false);
  
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      // Reset after 1.5 seconds
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Optionally: show error toast
    }
  };
  
  return {
    copyText,
    isCopied,
  };
}
