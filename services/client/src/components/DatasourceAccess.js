import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { Row, Col, Icon } from 'antd';

import { dbTiles } from 'components/DataSourceForm';
import DatasourceCard from 'components/DatasourceCard';

import s from './DatasourceCard.module.css';

const DatasourceAccess = ({ datasourceId, role }) => {
  const { t } = useTranslation();

  const icon = useMemo(() => dbTiles.find(tile => tile.title === datasource?.db_type)?.imgSrc, [datasource]);

  const access = useMemo(() => {
    const hasChecks = null; // check is roleState has checks of datasource (all checks, partial or none)
    const isAllChecks = null;

    let accessStr = 'No access';
    let accessIcon = 'lock';

    if (hasChecks && isAllChecks) {
      accessStr = 'Full access';
      accessIcon = 'unlock';
    }

    if (hasChecks && !isAllChecks) {
      accessStr = 'Full access';
      accessIcon = 'unlock';
    }

    return <><Icon type={accessIcon} /><span style={{ display: 'inline-block', margin: '0 5px' }}>{accessStr}</span></>;
  }, []);

  return (
    <div>
      <DatasourceCard
    </div>
  );
};

DatasourceAccess.propTypes = {
  datasource: PropTypes.object,
  isSelected: PropTypes.bool,
  roleState: PropTypes.object,
  onClick: PropTypes.func,
};

DatasourceAccess.defaultProps = {
  datasource: {},
  isSelected: false,
  roleState: {},
  onClick: () => {},
};

export default DatasourceAccess;
