import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/redux';
import { setTab } from '../lib/store';
import type { TokenCategory } from '../lib/types';

interface TabConfig {
  id: TokenCategory;
  label: string;
  hint: string;
}

const TABS_CONFIG: TabConfig[] = [
  { id: 'new' as const, label: 'New pairs', hint: 'Fresh listings & early momentum' },
  { id: 'final' as const, label: 'Final Stretch', hint: 'Near breakout / high activity' },
  { id: 'migrated' as const, label: 'Migrated', hint: 'Established pairs & migrated liquidity' },
];

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
