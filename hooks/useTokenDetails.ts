import { useState } from 'react';
import type { TokenRow } from '../lib/types';

/**
 * Hook for managing token details modal state.
 * 
 * @returns Object containing modal state and control functions
 * 
 * @remarks
 * - Provides open/close state management
 * - Handles selected token state
 * - Includes animation delay when closing modal
 */
export function useTokenDetails() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TokenRow | null>(null);
  
  const openDetails = (token: TokenRow) => {
    setSelected(token);
    setOpen(true);
  };
  
  const closeDetails = () => {
    setOpen(false);
    // Clear selected after animation
    setTimeout(() => setSelected(null), 300);
  };
  
  return {
    open,
    selected,
    openDetails,
    closeDetails,
  };
}
