import { useAppDispatch, useAppSelector } from '../lib/redux';
import { setSearch } from '../lib/store';

/**
 * Hook for managing token search state through Redux.
 * 
 * @returns Object containing search query and control functions
 * 
 * @remarks
 * - Connects to Redux store for search state
 * - Provides setSearch and clearSearch actions
 * - Uses useAppDispatch and useAppSelector for Redux integration
 */
export function useTokenSearch() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.tokensUi.search);
  
  return {
    search,
    setSearch: (query: string) => dispatch(setSearch(query)),
    clearSearch: () => dispatch(setSearch('')),
  };
}
