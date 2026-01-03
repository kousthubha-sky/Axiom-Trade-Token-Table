import { useAppDispatch, useAppSelector } from '../lib/redux';
import { toggleSort } from '../lib/store';
import type { SortKey } from '../lib/types';

/**
 * Hook for managing token sorting state through Redux.
 * 
 * @returns Object containing sort state and control functions
 * 
 * @remarks
 * - Connects to Redux store for sortKey and sortDir state
 * - Provides toggleSort action for changing sort column/direction
 * - Uses useAppDispatch and useAppSelector for Redux integration
 */
export function useTokenSort() {
  const dispatch = useAppDispatch();
  const sortKey = useAppSelector((state) => state.tokensUi.sortKey);
  const sortDir = useAppSelector((state) => state.tokensUi.sortDir);
  
  return {
    sortKey,
    sortDir,
    toggleSort: (key: SortKey) => dispatch(toggleSort(key)),
  };
}
