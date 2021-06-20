import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Select, Checkbox, Button, Modal } from 'antd';

import formatDistanceToNow from 'utils/formatDistanceToNow';
import useAuthContext from 'hooks/useAuthContext';
import TableList from 'components/TableList';

const { confirm } = Modal;

const TeamTable = ({ data, disableManagement, onChange, onRemove, loading }) => {
  const currentUser = useAuthContext();

  const showConfirm = record => {
    confirm({
      title: `Do you want to remove ${record.email}?`,
      onOk() {
        onRemove(record.rowId);
      },
      onCancel() {},
      maskClosable: true
    });
  };

  const managementColumns = [
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, record) => {
        return formatDistanceToNow(record.updatedAt);
      },
    },
    {
      title: 'Role',
      dataIndex: 'teamRole',
      key: 'teamRole',
      render: (_, record) => {
        return [
          <Select
            size="small"
            labelInValue
            value={{ key: record.teamRole }}
            style={{ marginLeft: 5, width: 100 }}
            disabled={disableManagement || record.rowId === currentUser.userId}
            onChange={value => onChange('teamRole', record.rowId, value.key)}
          >
            <Select.Option value="client">Client</Select.Option>
            <Select.Option value="viewer">Viewer</Select.Option>
            <Select.Option value="writer">Writer</Select.Option>
            <Select.Option value="owner">Owner</Select.Option>
          </Select>
        ];
      }
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (_, record) => (
        <Checkbox
          disabled={disableManagement || record.rowId === currentUser.userId}
          defaultChecked={record.active}
          onChange={e => { e.stopPropagation(); onChange('active', record.rowId, !record.active) }}
          onClick={e => e.stopPropagation()}
        />
      ),
    },
    {
      title: 'Remove',
      key: 'remove',
      render: (_, record) => (
        <Button
          disabled={disableManagement || record.rowId === currentUser.userId}
          onClick={() => showConfirm(record)}
          size="small"
          shape="circle"
          type="danger"
          icon="delete"
        />
      ),
    },
  ];

  let columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Invited At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => {
        return formatDistanceToNow(record.createdAt);
      },
    }
  ];

  if (!disableManagement) {
    columns = [...columns, ...managementColumns];
  }

  return [
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          rowKey={row => row.rowId}
          columns={columns}
          loading={loading}
          dataSource={data}
        />
      </Col>
    </Row>
  ];
};

TeamTable.propTypes = {
  editId: PropTypes.string,
  visibleModal: PropTypes.bool,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  disableManagement: PropTypes.bool,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

TeamTable.defaultProps = {
  visibleModal: false,
  onChange: () => { },
  disableManagement: true,
  data: [],
  loading: false
};

export default TeamTable;
