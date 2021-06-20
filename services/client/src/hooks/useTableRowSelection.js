import { useState } from 'react';

import clearSelection from 'utils/clearSelection';
import useKeyPress from 'hooks/useKeyPress';

export default ({ defaultSelectedRowKeys = [], rowKey = 'key' }) => {
  const shiftPress = useKeyPress('Shift');

  const [state, setState] = useState({
    selectedRowKeys: defaultSelectedRowKeys,
    pivot: null,
  });

  const toggleRowSelection = (selectedRowKeys, currRowKey) => {
    const selectedRowIndex = selectedRowKeys.indexOf(currRowKey);

    if (selectedRowIndex > -1) {
      selectedRowKeys.splice(selectedRowIndex, 1);
    } else {
      selectedRowKeys.push(currRowKey);
    }
  };

  const selectRow = (rows) => (record, rowIndex) => {
    const selectedRowKeys = [...state.selectedRowKeys];

    if (shiftPress && state.pivot !== null && rowIndex !== state.pivot) {
      const direction = Math.sign(state.pivot - rowIndex);
      const dist = Math.abs(state.pivot - rowIndex) - 1;
      let step = 0;

      while (step <= dist) {
        const i = rowIndex + step * direction;
        step += 1;

        const row = rows[i];
        const currRowKey = row[rowKey];

        toggleRowSelection(selectedRowKeys, currRowKey);
      }

      clearSelection();
    } else {
      toggleRowSelection(selectedRowKeys, record[rowKey]);
    }

    setState(prev => ({ ...prev, selectedRowKeys, pivot: rowIndex }));
  };

  const onSelectedRowKeysChange = selectedRowKeys => {
    setState(prev => ({ ...prev, selectedRowKeys }));
  };

  const deselectAll = () => {
    setState(prev => ({ ...prev, pivot: null, selectedRowKeys: [] }));
  };

  return {
    state,
    selectRow,
    deselectAll,
    onSelectedRowKeysChange,
  };
}
