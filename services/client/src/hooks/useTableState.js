import { useEffect } from 'react';
import { useSetState } from 'ahooks';

const defaultPageSize = 10;

export default ({ customPageSize }) => {
  const pageSize = customPageSize || defaultPageSize;

  const [tableState, updateTableState] = useSetState({
    allTags: [],
    loading: false,
    selectedTags: [],
    currentPage: 1,
    paginationVars: {
      limit: pageSize,
      offset: 0,
    },
    pageSize,
  });

  useEffect(() => {
    updateTableState({
      paginationVars: {
        limit: pageSize,
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
    updateTableState,
  };
};
