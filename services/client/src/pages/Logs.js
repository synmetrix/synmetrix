import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Divider } from 'antd';

import { useTranslation } from 'react-i18next';
import useTableState from 'hooks/useTableState';
import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';
import useLogs from 'hooks/useLogs';

import LogsTable from 'components/LogsTable';
import PageInfo from 'components/PageInfo';
import Container from 'components/Container';
import Breadcrumbs from 'components/Breadcrumbs';
import RequestLogInfo from 'components/RequestLogInfo';
import LogsFilterForm from 'components/LogsFilterForm';

const defaultFilterState = {
  from: moment().subtract(1, 'days'),
  to: moment(),
  sort: 'desc',
};

const Logs = ({ match }) => {
  const { t } = useTranslation();
  const { params = {} } = match || {};
  const { rowId } = params || null;
  const [filter, setFilter] = useState(defaultFilterState);
  const [location, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix('/logs');

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
    current,
    totalCount,
    queries: {
      allLogsData,
      currentData,
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

  const onFilterChange = (data) => {
    setFilter(data);
  };

  return (
    <Container>
      {!rowId && (
        <>
          <PageInfo
            title={t('Logs')}
            description={(
              <>
                <ul>
                  <li>List cubejs logs</li>
                </ul>
              </>
            )}
          />
          <Divider />
          <div style={{ marginLeft: 20 }}>
            <LogsFilterForm initialValues={filter} onChange={onFilterChange} />
          </div>
          <Divider />
          <LogsTable
            logs={allLogs}
            loading={allLogsData?.fetching}
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
          <RequestLogInfo request={current} loading={currentData?.fetching} />
        </div>
      )}
    </Container>
  );
};

Logs.propTypes = {
  match: PropTypes.object.isRequired,
};

Logs.defaultProps = {};

export default Logs;
