import { useEffect } from 'react';

import useXState from 'hooks/useXState';

const defaultPageSize = 10;

export default ({ customPageSize }) => {
  const pageSize = customPageSize || defaultPageSize;

  const [tableState, updateTableState, setTableState] = useXState({
    allTags: [],
    loading: false,
    selectedTags: [],
    currentPage: 1,
    paginationVars: {
      first: pageSize,
      offset: 0,
    },
    pageSize,
  });

  useEffect(() => {
    updateTableState({
      paginationVars: {
        first: pageSize,
        offset: pageSize * (tableState.currentPage - 1)
      }
    });
  }, [pageSize, tableState.currentPage, updateTableState]);

  const onPageChange = ({ current }) => {
    updateTableState({ currentPage: current });
  };

  return {
    tableState,
    onPageChange,
    setTableState,
    updateTableState,
  };
};
