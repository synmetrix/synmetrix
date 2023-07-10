import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Button } from 'antd';

import { useTranslation } from 'react-i18next';

import RolesTable from './RolesTable';

const RolesManagement = ({ roles, onCreateRole, onModalOpen }) => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: 15 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{t('Manage Roles')}</div>
        <Button onClick={onCreateRole}>{t('Create Role')}</Button>
      </div>
      <RolesTable roles={roles} onModalOpen={onModalOpen} />
    </div>
  );
};

RolesManagement.propTypes = {
  roles: PropTypes.array,
  onCreateRole: PropTypes.func,
  onModalOpen: PropTypes.func,
};

RolesManagement.defaultProps = {
  roles: [],
  onCreateRole: () => {},
  onModalOpen: () => {},
};

export default RolesManagement;