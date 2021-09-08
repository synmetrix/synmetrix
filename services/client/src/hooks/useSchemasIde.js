import { useCallback } from 'react';

import useLocation from 'hooks/useLocation';
import useTabs from 'hooks/useTabs';
import useAppSettings from 'hooks/useAppSettings';

export default ({ dataSourceId }) => {
  const [location, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const defaultTabId = 'sqlrunner';

  const {
    state: tabsState,
    openTab,
    closeTab,
    changeActiveTab
  } = useTabs({ activeTab: defaultTabId });

  const changePath = useCallback((activeKey) => {
    const basePath = [withAuthPrefix('/schemas'), dataSourceId, activeKey].filter(v => !!v).join('/');

    if (location.pathname !== basePath) {
      setLocation(basePath);
    }
  },
  [withAuthPrefix, dataSourceId, location.pathname, setLocation]
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
      const { activeTab } = tabsState;
      closeTab(id);

      const anyOtherTab = Object.keys(tabsState.tabs).find(tabId => tabId !== id);
      const anyOtherTabName = tabsState.tabs[anyOtherTab] || defaultTabId;

      // if we're closing the active tab and there are any other tabs
      if (activeTab === id && anyOtherTabName) {
        changeActiveTab(anyOtherTabName);

        // if other tab is not the default one then open it
        if (anyOtherTabName !== defaultTabId) {
          openSchema({ id: anyOtherTab, name: anyOtherTabName });
        // else change path only
        } else {
          changePath(anyOtherTabName);
        }
      // else move to active
      } else {
        const activeTabName = tabsState.tabs[activeTab];
        changePath(activeTabName);
      }
    }
  }, [changeActiveTab, changePath, closeTab, openSchema, tabsState]);

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
