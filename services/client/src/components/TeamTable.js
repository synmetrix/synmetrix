import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Select, Checkbox, Button, Modal } from 'antd';

import useCurrentUserState from 'hooks/useCurrentUserState';

import formatDistanceToNow from 'utils/formatDistanceToNow';
import TableList from 'components/TableList';

const { confirm } = Modal;

const TeamTable = ({ data, disableManagement, onChange, onRemove, loading }) => {
  const { currentUserState } = useCurrentUserState();
  const currentUser = currentUserState?.users_by_pk;

  const showConfirm = record => {
    confirm({
      title: `Do you want to remove ${record.email}?`,
      onOk() {
        onRemove(record.id);
      },
      onCancel() {},
      maskClosable: true
    });
  };

  const isRowDisabled = record => disableManagement || record.user_id === currentUser.id;

  const managementColumns = [
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (_, record) => {
        return formatDistanceToNow(record.updated_at);
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
            disabled={isRowDisabled(record)}
            onChange={value => onChange('teamRole', record.id, value.key)}
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
          disabled={isRowDisabled(record)}
          defaultChecked={record.active}
          onChange={e => { e.stopPropagation(); onChange('active', record.id, !record.active) }}
          onClick={e => e.stopPropagation()}
        />
      ),
    },
    {
      title: 'Remove',
      key: 'remove',
      render: (_, record) => (
        <Button
          disabled={isRowDisabled(record)}
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
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => {
        return formatDistanceToNow(record.created_at);
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
          rowKey={row => row.id}
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
