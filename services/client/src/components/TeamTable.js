import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Row, Col, Button, Modal, Select } from 'antd';

import useCurrentUserState from 'hooks/useCurrentUserState';
import useAccessLists from 'hooks/useAccessLists';

import TableList from 'components/TableList';

const { confirm } = Modal;
const { Option } = Select;

const TeamTable = ({ data, disableManagement, onRemove, onAccessListChange, loading }) => {
  const { currentUserState } = useCurrentUserState();
  const currentUser = currentUserState?.users_by_pk;

  const {
    all: accessLists,
  } = useAccessLists({
    pauseQueryAll: false,
    disableSubscription: false,
  });

  const showConfirm = record => {
    confirm({
      title: `${t('Do you want to remove')} ${record?.user?.display_name}?`,
      onOk() {
        onRemove(record.id);
      },
      onCancel() {},
      maskClosable: true
    });
  };

  const isRowDisabled = record => disableManagement || record?.user?.id === currentUser?.id;

  const accessListOptions = useMemo(() => 
    accessLists.map(a => (
      <Option key={a.id} value={a.id}>
        {a.name}
      </Option>
    ))
  , [accessLists]);

  const managementColumns = [
    {
      title: t('Roles'),
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
              allowClear
              style={{ width: 240 }}
              value={accessList?.id || '* FULL ACCESS *'}
              disabled={!accessLists.length}
              onChange={(accessListId = null) => onAccessListChange(record?.member_roles?.[0]?.id, accessListId)}
            >
              {accessListOptions}
            </Select>
          );
        }

        return accessList?.name;
      },
    },
    {
      title: t('Remove'),
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
      title: t('Username'),
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
