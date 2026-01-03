import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/redux';
import { setTab } from '../lib/store';
import { TABS_CONFIG } from '../lib/constants';
import type { TokenCategory } from '../lib/types';

/**
 * Hook for managing token category tabs state through Redux.
 * 
 * @returns Object containing tab state and control functions
 * 
 * @remarks
 * - Connects to Redux store for active tab state
 * - Provides tab configuration and hint text
 * - Uses useAppDispatch and useAppSelector for Redux integration
 */
export function useTokenTabs() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.tokensUi.tab);
  
  const tabs = useMemo(() => TABS_CONFIG, []);
  
  return {
    activeTab,
    setTab: (tab: TokenCategory) => dispatch(setTab(tab)),
    tabs,
  };
}
