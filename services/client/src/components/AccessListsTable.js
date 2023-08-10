import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Row, Col, Button, message } from 'antd';

import TableList from 'components/TableList';
import AccessListDatasource from 'components/AccessListDatasource';
import EmptyDefault from 'components/EmptyDefault';

import useTableState from 'hooks/useTableState';
import useAccessLists from 'hooks/useAccessLists';
import useCheckResponse from 'hooks/useCheckResponse';

import formatDistanceToNow from '../utils/formatDistanceToNow';

const AccessListsTable = ({ totalCount, loading, onModalOpen }) => {
  const { t } = useTranslation();

  const {
    tableState: {
      pageSize,
      currentPage,
      paginationVars,
    },
    onPageChange,
  } = useTableState({});

  const {
    all: accessLists,
    mutations: {
      createMutation, execCreateMutation,
      deleteMutation, execDeleteMutation,
    }
  } = useAccessLists({
    pauseQueryAll: false,
    disableSubscription: false,
    pagination: paginationVars,
  });

  useCheckResponse(createMutation, () => {}, {
    successMessage: t('Copied.'),
  });

  useCheckResponse(deleteMutation, (res) => {
    if (!res?.delete_access_lists_by_pk) {
      message.error(t('No permissions'));
    } else {
      message.success(t('Deleted.'));
    }
  }, {
    successMessage: null,
  });

  const onCopy = useCallback((accessList) => {
    const newData = {
      config: accessList.config,
      name: accessList.name || '',
      team_id: accessList.team_id,
    };
  
    newData.name += ` (${t('copy')})`;

    execCreateMutation({
      object: newData,
    });
  }, [execCreateMutation, t]);

  const columns = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Access to data source'),
      dataIndex: 'access',
      key: 'access',
      render: (_, record) => {
        const count = Object.values(record?.config?.datasources || {}).length;
        return `${count} ${t('Data sources')}`;
      }
    },
    {
      title: t('Created At'),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => {
        const createdAt = formatDistanceToNow(record.created_at);
        return createdAt;
      },
    },
    {
      title: t('Updated At'),
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (_, record) => {
        const updatedAt = formatDistanceToNow(record.updated_at);
        return updatedAt;
      },
    },
    {
      title: t('Actions'),
      render: (_, record) => (
        <>
          <Button onClick={() => onModalOpen(record.id)}>
            {t('Edit')}
          </Button>
          <Button onClick={() => onCopy(record)}>
            {t('Copy')}
          </Button>
          <Button onClick={() => execDeleteMutation({ id: record.id })}>
            {t('Delete')}
          </Button>
        </>
      ),
    }
  ];

  const datasource = useMemo(() => accessLists.map(accessList => {
    let datasources = Object.entries(accessList?.config?.datasources || {}).map(([datasourceId, val]) => (
      <AccessListDatasource key={datasourceId} datasourceId={datasourceId} datasourcePermissions={val?.cubes} />
    ));

    if (!datasources.length) {
      datasources = <EmptyDefault />;
    }

    return {
      ...accessList,
      datasources,
    };
  }), [accessLists]);

  return [
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          loading={loading}
          rowKey={row => row.id}
          columns={columns}
          dataSource={datasource}
          pagination={{
            pageSize,
            total: totalCount,
            current: currentPage,
          }}
          onChange={onPageChange}
          expandedRowRender={record => record?.datasources}
        />
      </Col>
    </Row>
  ];
};

AccessListsTable.propTypes = {
  totalCount: PropTypes.number,
  loading: PropTypes.bool,
  onModalOpen: PropTypes.func,
};

AccessListsTable.defaultProps = {
  totalCount: 0,
  loading: false,
  onModalOpen: () => {},
};

export default AccessListsTable;
