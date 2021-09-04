import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { set, getOr } from 'unchanged';
import cx from 'classnames';

import { Empty } from 'antd';
import { useTable, useSortBy } from 'react-table';

import { Column, Table, SortDirection } from 'react-virtualized';

import Loader from 'components/Loader';
import MenuView from 'components/MenuView';
import PopoverButton from 'components/PopoverButton';
import ErrorMessage from 'components/ErrorMessage';
import s from './TableView.module.css';

const COL_WIDTH = 200;

// set with unique ids inside https://stackoverflow.com/a/49821454
class SortBySet extends Set {
  reverseUniq(byKey) {
    const presentKeys = [];

    [...this.values()].reverse().forEach(value => {
      if (presentKeys.includes(value[byKey])) {
        this.delete(value);
      } else {
        presentKeys.push(value[byKey]);
      }
    });
  }
};

const TableView = (props) => {
  const {
    sortBy,
    columns: userColumns,
    data,
    width,
    height,
    headerHeight,
    rowHeight,
    loading,
    loadingProgress,
    emptyDesc,
    onSortUpdate,
    orderByFn,
    footer,
    messages,
    sortDisabled,
    scrollToIndex,
    onScroll,
    tableId,
    settings: {
      hideIndexColumn
    }
  } = props;

  const defaultColumns = useMemo(() => Object.keys(getOr({}, 0, data)).map(
    colId => ({ Header: colId, accessor: row => row[colId], id: colId, })
  ),
  [data]
  );

  const columns = userColumns || defaultColumns;

  // Use the state and functions returned from useTable to build your UI
  const {
    rows,
    flatHeaders,
    setState,
  } = useTable(
    {
      columns,
      data,
      debug: false,
      // change orderByFn if you need sort from useSortBy
      orderByFn,
      initialState: {
        sortBy,
      },
    },
    useSortBy
  );

  useEffect(
    () => {
      setState(prev => set('sortBy', sortBy, prev));
    },
    [sortBy, setState]
  );

  const headerRenderer = ({ label, columnData }) => {
    const {
      sortDirection,
      onSortChange,
      columnId,
    } = columnData;

    const children = [
      <span
        className={s.headerColumn}
        key="label"
        title={typeof label === 'string' ? label : null}
      >
        {label}
      </span>,
    ];

    let iconType = 'more';
    if (sortDirection) {
      iconType = sortDirection === SortDirection.DESC ? 'sort-descending' : 'sort-ascending';
    }

    const onClickSort = (e, sortDir) => {
      onSortChange(sortDir, columnId);
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const routes = [
      {
        onClick: (_, e) => onClickSort(e, SortDirection.ASC),
        title: 'Sort ASC',
      },
      {
        onClick: (_, e) => onClickSort(e, SortDirection.DESC),
        title: 'Sort DESC',
      },
      {
        onClick: (_, e) => onClickSort(e, null),
        title: 'Don\'t sort',
      }
    ];

    if (sortDisabled) {
      return children;
    }

    children.push(
      <PopoverButton
        key="dropdown"
        type="dropdown"
        iconType={iconType}
        style={{ backgroundColor: 'transparent', borderColor: 'transparent', boxShadow: 'none' }}
        overlay={(
          <MenuView
            mode="vertical"
            nodes={routes}
          />
        )}
        trigger={['click']}
      />
    );

    return children;
  };

  const cellDataGetter = ({ rowData, dataKey }) => rowData.original[dataKey];
  const tableWidth = flatHeaders.length * COL_WIDTH;

  const onSortChange = (direction, columnId) => {
    setState(prev => {
      const sortBySet = new SortBySet(prev.sortBy);

      if (direction) {
        sortBySet.add({
          id: columnId,
          desc: direction === SortDirection.DESC,
        });

        sortBySet.reverseUniq('id');
      } else {
        sortBySet.forEach(value => {
          if (value.id === columnId) {
            sortBySet.delete(value);
          }
        });
      }

      const nextSortBy = [...sortBySet];
      onSortUpdate(nextSortBy);

      return set('sortBy', nextSortBy, prev);
    });
  };

  if (!columns.length && !rows.length) {
    return (
      <Loader spinning={loading}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyDesc} />
      </Loader>
    );
  }

  const loadingTip = loadingProgress.timeElapsed ? `${loadingProgress.stage} ${(parseFloat(loadingProgress.timeElapsed) / 1000).toFixed(2)} secs...` : loadingProgress.stage;

  return (
    <Loader spinning={loading} tip={loadingTip}>
      <>
        {messages.map((message, i) => <ErrorMessage key={i} {...message} />)}
        <div style={{ width, height, overflow: 'auto' }}>
          <Table
            id={tableId}
            className={cx(s.table, tableId && s.minWidth)}
            width={tableWidth}
            height={height}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            overscanRowCount={3}
            onScroll={(values) => onScroll({ ...values, rowHeight })}
            scrollToAlignment='start'
            scrollToIndex={scrollToIndex}
          >
            {!hideIndexColumn && (
              <Column
                label="Index"
                cellDataGetter={({ rowData }) => rowData.index + 1}
                dataKey="index"
                width={60}
              />
            )}
            {flatHeaders.map(col => {
              const value = col.render('Header');

              const sortDirection = col.isSorted && (
                (col.isSortedDesc && SortDirection.DESC) || SortDirection.ASC
              );

              return (
                <Column
                  key={col.id}
                  label={value}
                  dataKey={col.id}
                  width={COL_WIDTH}
                  headerRenderer={headerRenderer}
                  cellDataGetter={cellDataGetter}
                  columnData={{
                    columnId: col.id,
                    onSortChange,
                    sortDirection,
                  }}
                />
              );
            })}
          </Table>
        </div>
        {footer(rows)}
      </>
    </Loader>
  );
};

TableView.propTypes = {
  sortBy: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      desc: PropTypes.bool,
    })
  ),
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  onSortUpdate: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number,
  height: PropTypes.number,
  headerHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  loading: PropTypes.bool,
  loadingProgress: PropTypes.shape({
    stage: PropTypes.string,
    timeElapsed: PropTypes.number,
  }),
  emptyDesc: PropTypes.string,
  orderByFn: PropTypes.func,
  footer: PropTypes.func,
  sortDisabled: PropTypes.bool,
  scrollToIndex: PropTypes.number,
  onScroll: PropTypes.func,
  tableId: PropTypes.string,
  className: PropTypes.string,
  settings: PropTypes.shape({
    hideIndexColumn: PropTypes.bool
  }),
};

TableView.defaultProps = {
  sortBy: [],
  messages: [],
  onSortUpdate: () => { },
  data: [],
  columns: undefined,
  width: 300,
  height: 300,
  headerHeight: 30,
  rowHeight: 20,
  loading: false,
  loadingProgress: {},
  emptyDesc: 'No Data',
  orderByFn: undefined,
  footer: () => { },
  sortDisabled: false,
  scrollToIndex: 0,
  onScroll: () => {},
  tableId: null,
  className: null,
  settings: {
    hideIndexColumn: false
  }
};

export default TableView;
