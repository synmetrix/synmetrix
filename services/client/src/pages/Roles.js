import React, { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';

import RolesManagement from 'components/RolesManagement';
import Breadcrumbs from 'components/Breadcrumbs';
import RoleModal from 'components/RoleModal';

import useQuery from 'hooks/useQuery';
import useRoles from 'hooks/useRoles';
import useSources, { datasourceMetaQuery } from 'hooks/useSources';
import usePermissions from 'hooks/usePermissions';
// import AccessState from '../components/AccessPart';

const Roles = ({ match }) => {
  const { t } = useTranslation();
  const { params = {} } = match || {};
  const { editId } = params;
  const [location, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const [allMeta, setAllMeta] = useState();
  const basePath = withAuthPrefix('/roles');
  const isNew = location.pathname.includes('/new');

  const {
    allRoles,
    current,
    saveRole,
  } = useRoles({ editId });

  const {
    all,
    currentMeta,
    queries: {
      metaData,
      execQueryMeta,
    },
  } = useSources({
    // pauseQueryAll: !!state.selectedSourceId,
    // params: {
    //   editId: state.selectedSourceId,
    // },
  });

  const { fallback } = usePermissions({ scope: 'alerts' });
  if (fallback) {
    return fallback;
  }

  const onCreateRole = () => {
    setLocation(`${basePath}/new`);
  };

  const onModalOpen = id => {
    setLocation(`${basePath}/${id || ''}`);
  };

  const onModalClose = () => {
    setLocation(basePath);
  };

  const breadcrumbs = [
    { path: `${basePath}`, title: 'Roles' },
    isNew && { path: `${basePath}/new`, title: 'New' },
    editId && { path: `${basePath}/${editId}`, title: editId },
  ].filter(v => !!v);

  return (
    <div style={{ padding: 15 }}>
      <div style={{ marginBottom: 10 }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <RoleModal
        role={current}
        onCancel={onModalClose}
        onSave={saveRole}
        visible={editId || isNew}
        title={editId ? t('Edit Role') : t('Create role')}
      />
      <RolesManagement roles={allRoles} onCreateRole={onCreateRole} onModalOpen={onModalOpen} />
    </div>
  );
};

Roles.propTypes = {
  match: PropTypes.object.isRequired,
};

Roles.defaultProps = {};

export default Roles;
