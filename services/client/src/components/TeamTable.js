import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Button, Modal, Select } from 'antd';

import useCurrentUserState from 'hooks/useCurrentUserState';
import useCurrentTeamState from 'hooks/useCurrentTeamState';
import useAccessLists from 'hooks/useAccessLists';

import TableList from 'components/TableList';

const { confirm } = Modal;
const { Option } = Select;

const TeamTable = ({ data, disableManagement, onRemove, onAccessListChange, loading }) => {
  const { currentUserState } = useCurrentUserState();
  const { currentTeamState: currentTeam } = useCurrentTeamState();
  const currentUser = currentUserState?.users_by_pk;

  const {
    all: accessLists,
  } = useAccessLists({
    pauseQueryAll: false,
    disableSubscription: false,
    params: {
      teamId: currentTeam.id,
    },
  });

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

  const isRowDisabled = record => disableManagement || record?.user?.id === currentUser?.id;

  const managementColumns = [
    {
      title: 'Roles',
      key: 'teamRole',
      render: (_, record) => {
        const { member_roles: roles } = record || {};

        return roles.map(r => r.team_role).join(',');
      },
    },
    {
      title: 'Access list',
      key: 'accessList',
      render: (_, record) => {
        const accessList = record?.member_roles?.[0]?.access_list;
        const role = record?.member_roles?.[0]?.team_role;

        if (role === 'member') {
          return (
            <Select
              value={accessList?.id}
              style={{ width: 240 }}
              onChange={(accessListId) => onAccessListChange(record?.member_roles?.[0]?.id, accessListId)}
            >
              {accessLists.map(a => (
                <Option key={a.id} value={a.id}>
                  {a.name}
                </Option>
              ))}
            </Select>
          );
        }

        return accessList?.name;
      },
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
  onAccessListChange: PropTypes.func,
  onSave: PropTypes.func,
  disableManagement: PropTypes.bool,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

TeamTable.defaultProps = {
  visibleModal: false,
  onChange: () => { },
  onAccessListChange: () => {},
  disableManagement: true,
  data: [],
  loading: false
};

export default TeamTable;
