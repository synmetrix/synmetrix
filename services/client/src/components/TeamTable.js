import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Select, Button, Modal } from 'antd';

import useCurrentUserState from 'hooks/useCurrentUserState';

import TableList from 'components/TableList';

const { confirm } = Modal;

const TeamTable = ({ data, disableManagement, onChange, onRemove, loading }) => {
  const { currentUserState } = useCurrentUserState();
  const currentUser = currentUserState?.users_by_pk;

  const showConfirm = record => {
    confirm({
      title: `Do you want to remove ${record?.user?.display_name}?`,
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
      title: 'Roles',
      key: 'teamRole',
      render: (_, record) => {
        const { member_roles: roles } = record || {};

        return roles.map(r => r.team_role).join(',');
      }
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
      title: 'Name',
      dataIndex: 'user.display_name',
      key: 'display_name',
    },
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
