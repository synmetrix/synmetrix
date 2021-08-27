import { useMemo, useCallback, useEffect } from 'react';

import useLocation from 'hooks/useLocation';
import useTabs from 'hooks/useTabs';

export default ({ dataSourceId }) => {
  const [location, setLocation] = useLocation();
  const defaultTabId = 'sqlrunner';

  const {
    state: tabsState,
    openTab,
    closeTab,
    changeActiveTab
  } = useTabs({ activeTab: defaultTabId });

  const changePath = useCallback((activeKey) => {
    const basePath = ['/d/schemas', dataSourceId, activeKey].filter(v => !!v).join('/');

    if (location.pathname !== basePath) {
      setLocation(basePath);
    }
  },
  [dataSourceId, setLocation, location]
  );

  const openSchema = useCallback(
    (schema, hash) => {
      openTab(schema);
      changePath(schema.name);

      if (hash) { 
        window.location.hash = hash;
      }
    },
    [openTab, changePath]
  );

  const getTabId = (schema) => schema && schema.id;

  const editTab = useCallback((id, action) => {
    if (action === 'remove') {
      const anyOtherTab = Object.keys(tabsState.tabs).find(tabId => tabId !== id);
      closeTab(id);

      // if we're closing active tab
      if (tabsState.activeTab?.id === id && tabsState.activeTab?.name) {
        openSchema({ id: anyOtherTab, name: tabsState.tabs[anyOtherTab] });
      } else if (!anyOtherTab) {
      // if it's not the active tab but no other tabs
        changePath(defaultTabId);
        changeActiveTab(defaultTabId);
      // if it's not the active tab and any other tabs
      } else if (tabsState.activeTab?.name && anyOtherTab) {
        changePath(tabsState.activeTab.name);
        openSchema({ id: anyOtherTab, name: tabsState.tabs[anyOtherTab] });
      }
    }
  }, [changeActiveTab, changePath, closeTab, openSchema, tabsState.activeTab, tabsState.tabs]);

  return {
    openSchema,
    openedTabs: tabsState.tabs,
    activeTab: tabsState.activeTab,
    changeActiveTab,
    getTabId,
    editTab,
    closeTab,
    openTab,
  };
};
