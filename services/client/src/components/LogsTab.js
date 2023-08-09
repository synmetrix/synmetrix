import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import useTableState from 'hooks/useTableState';
import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';
import useLogs from 'hooks/useLogs';

import LogsTable from 'components/LogsTable';
import Breadcrumbs from 'components/Breadcrumbs';
import RequestLogInfo from 'components/RequestLogInfo';
import LogsFilterForm from 'components/LogsFilterForm';

const defaultFilterState = {
  from: moment().subtract(1, 'days'),
  to: null,
  sort: null,
};

const LogsTab = ({ params }) => {
  const { rowId } = params || null;
  const [filter, setFilter] = useState(defaultFilterState);
  const [_, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix('/logs/requests');

  const {
    tableState: {
      pageSize,
      currentPage,
      paginationVars,
    },
    onPageChange,
  } = useTableState({});

  const {
    allLogs,
    totalCount,
    queries: {
      allData,
    }
  } = useLogs({
    rowId,
    pagination: paginationVars,
    params: {
      ...filter,
    },
  });

  const onClickRow = recordId => {
    setLocation(`${basePath}/${recordId}`);
  };

  const breadcrumbs = [
    { path: basePath, title: 'Logs' },
    params?.rowId && { path: `${basePath}/${params?.rowId}`, title: params?.rowId },
  ].filter(v => !!v);

  const onFilterChange = data => {
    setFilter(data);
  };

  return (
    <div>
      {!rowId && (
        <>
          <div style={{ marginLeft: 20 }}>
            <LogsFilterForm initialValues={filter} onChange={onFilterChange} />
          </div>
          <LogsTable
            logs={allLogs}
            loading={allData?.fetching}
            totalCount={totalCount}
            onClickRow={onClickRow}
            onPageChange={onPageChange}
            basePath={basePath}
            pagination={{
              pageSize,
              total: totalCount,
              current: currentPage,
            }}
          />
        </>
      )}
      {rowId && (
        <div style={{ padding: '20px 20px' }}>
          <div style={{ marginBottom: 10 }}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          <RequestLogInfo requestId={rowId} />
        </div>
      )}
    </div>
  );
};

LogsTab.propTypes = {
  params: PropTypes.string,
};

LogsTab.defaultProps = {
  params: null,
};

export default LogsTab;
