import { useEffect, useCallback } from 'react';
import { add, remove } from 'unchanged';

import useXState from 'hooks/useXState';

export default (activePanelKey = []) => {
  const [state, updateState, setState] = useXState({
    activePanelKey,
  });

  useEffect(() => {
    if (activePanelKey.length) {
      updateState({ activePanelKey });
    }
  },
  [activePanelKey, updateState]
  );

  const getSectionIndex = useCallback(key => state.activePanelKey.indexOf(key), [state.activePanelKey]);

  const setActiveKeys = useCallback(keys => {
    const uniqKeys = [...new Set(keys)];
    updateState({ activePanelKey: uniqKeys });
  },
  [updateState]
  );

  const onToggleSection = useCallback(key => {
    let keys = [];

    const strKey = key.toString();
    const pos = getSectionIndex(strKey);

    if (pos === -1) {
      keys = add(null, strKey, state.activePanelKey);
    } else {
      keys = remove(pos, state.activePanelKey);
    }

    setActiveKeys(keys);
  },
  [getSectionIndex, setActiveKeys, state.activePanelKey]
  );

  return {
    state,
    setState,
    updateState,
    getSectionIndex,
    onToggleSection,
    setActiveKeys,
  };
};
