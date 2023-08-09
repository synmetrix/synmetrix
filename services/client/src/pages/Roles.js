import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';

import AccessListsManagement from 'components/AccessListsManagement';
import Breadcrumbs from 'components/Breadcrumbs';
import AccessListModal from 'components/AccessListModal';

import usePermissions from 'hooks/usePermissions';

const Roles = ({ match }) => {
  const { t } = useTranslation();
  const { params = {} } = match || {};
  const { editId } = params;
  const [location, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix('/roles');
  const isNew = location.pathname.includes('/new');

  const { fallback } = usePermissions({ scope: 'alerts' });
  if (fallback) {
    return fallback;
  }

  const onNewAccessList = () => {
    setLocation(`${basePath}/new`);
  };

  const onModalOpen = id => {
    setLocation(`${basePath}/${id || ''}`);
  };

  const breadcrumbs = [
    { path: `${basePath}`, title: t('Roles') },
    isNew && { path: `${basePath}/new`, title: t('New') },
    editId && { path: `${basePath}/${editId}`, title: editId },
  ].filter(v => !!v);

  return (
    <div style={{ padding: 15 }}>
      <div style={{ marginBottom: 10 }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <AccessListModal
        editId={editId}
        onClose={() => setLocation(basePath)}
        visible={!!editId || isNew}
        title={editId ? t('Edit Role') : t('Create role')}
      />
      <AccessListsManagement
        onNewAccessList={onNewAccessList}
        onModalOpen={onModalOpen}
      />
    </div>
  );
};

Roles.propTypes = {
  match: PropTypes.object.isRequired,
};

Roles.defaultProps = {};

export default Roles;
