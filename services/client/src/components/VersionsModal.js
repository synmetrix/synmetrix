import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button, Input } from 'antd';

import useTableState from 'hooks/useTableState';

import TableList from './TableList';

import formatDistanceToNow from '../utils/formatDistanceToNow';

const { TextArea } = Input;

const VersionsModal = ({ versions, onRestore }) => {
  const { t } = useTranslation();

  const {
    tableState: {
      pageSize,
      currentPage,
      paginationVars,
    },
    onPageChange,
  } = useTableState({});

  const onRestoreVersion = (e, record) => {
    e.stopPropagation();
    onRestore(record.checksum, record.dataschemas);
  };

  const versionColumns = [
    {
      title: t('Checksum'),
      dataIndex: 'checksum',
      key: 'checksum',
    },
    {
      title: t('Author'),
      dataIndex: ['user', 'display_name'],
      key: 'display_name',
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
      title: t('Actions'),
      render: (_, record, index) => {
        if (index === 0) {
          return false;
        }

        return (
          <Button onClick={(e) => onRestoreVersion(e, record)}>
            {t('Restore')}
          </Button>
        );
      },
    }
  ];

  const schemaColumns = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div>
      <TableList
        rowKey={row => row.id}
        columns={versionColumns}
        dataSource={versions}
        pagination={{
          pageSize,
          total: versions.length,
          current: currentPage,
        }}
        onChange={onPageChange}
        expandRowByClick
        expandedRowRender={(version) => (
          <div>
            <TableList
              showHeader={false}
              rowKey={row => row.id}
              columns={schemaColumns}
              dataSource={version.dataschemas}
              expandRowByClick
              expandedRowRender={(row) => (
                <TextArea
                  disabled
                  rows={20}
                  defaultValue={row.code}
                  style={{ color: 'rgba(0, 0, 0, 0.65)', backgroundColor: 'white' }}
                />
              )}
              pagination={false}
            />
          </div>
        )}
      />
    </div>
  );
};

VersionsModal.propTypes = {
  versions: PropTypes.array,
  onRestore: PropTypes.func,
};

VersionsModal.defaultProps = {
  versions: [],
  onRestore: () => {},
};

export default VersionsModal;