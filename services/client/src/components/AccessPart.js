import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import s from './DatasourceCard.module.css';

export const calcMembersCount = (model) => {
  return Object.entries(model || {}).reduce((acc, [_, arr]) => acc + arr.length, 0);
};

const AccessPart = ({ datasourceMeta, datasourcePermissions, modelName }) => {
  const { t } = useTranslation();
  
  const countCheckedMembers = useMemo(() => {
    let allColumnsCount = 0;
    let roleColumnsCount = 0;
    
    if (modelName) {
      allColumnsCount = calcMembersCount(datasourceMeta?.[modelName]);
      roleColumnsCount = calcMembersCount(datasourcePermissions?.[modelName]);
    } else {
      allColumnsCount = Object.values(datasourceMeta).reduce((acc, m) => acc + calcMembersCount(m), 0);
      roleColumnsCount = Object.values(datasourcePermissions).reduce((acc, m) => acc + calcMembersCount(m), 0);
    }
    
    if (allColumnsCount === roleColumnsCount) {
      return 'full';
    }
    if (roleColumnsCount > 0 && allColumnsCount > 0) {
      return 'partial';
    }
    return 'no';
  }, [datasourceMeta, datasourcePermissions, modelName]);

  return (
    <div>
      {countCheckedMembers.toUpperCase()} {t('ACCESS')}
    </div>
  );
};

AccessPart.propTypes = {
  datasourceMeta: PropTypes.object,
  datasourcePermissions: PropTypes.object,
  modelName: PropTypes.string,
};

AccessPart.defaultProps = {
  datasourceMeta: {},
  datasourcePermissions: {},
  modelName: null,
};

export default AccessPart;