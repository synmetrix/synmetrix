import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';

import { useTranslation } from 'react-i18next';

import AccessListsTable from './AccessListsTable';

const AccessListsManagement = ({ onNewAccessList, onModalOpen }) => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: 15 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{t('Manage access lists')}</div>
        <Button onClick={onNewAccessList}>{t('Create access lists')}</Button>
      </div>
      <AccessListsTable
        onModalOpen={onModalOpen}
      />
    </div>
  );
};

AccessListsManagement.propTypes = {
  onNewAccessList: PropTypes.func,
  onModalOpen: PropTypes.func,
};

AccessListsManagement.defaultProps = {
  onNewAccessList: () => {},
  onModalOpen: () => {},
};

export default AccessListsManagement;
