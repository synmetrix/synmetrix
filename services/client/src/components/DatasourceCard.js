import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import useSources from 'hooks/useSources';

import { dbTiles } from 'components/DataSourceForm';
import AccessPart from 'components/AccessPart';

import pickKeys from 'utils/pickKeys';

import s from './DatasourceCard.module.css';

export const updateMeta = (currentMeta) => (
  currentMeta.reduce((acc, val) => {
    const updatedMeta = { ...pickKeys(['measures', 'dimensions', 'segments'], val) };

    return {
      ...acc,
      [val?.name]: updatedMeta,
    };
  }, {})
);

const DatasourceCard = ({ datasource, config, isSelected, onClick, onLoadMeta }) => {
  const {
    currentMeta,
    queries: {
      metaData,
      execQueryMeta,
    },
  } = useSources({
    pauseQueryAll: true,
    params: {
      editId: datasource?.id,
    },
  });

  const icon = useMemo(() => dbTiles.find(tile => tile.title === datasource?.db_type)?.imgSrc, [datasource]);
  const meta = useMemo(() => updateMeta(currentMeta), [currentMeta]);

  useEffect(() => {
    if (datasource.id && !metaData.data && !metaData.fetching) {
      execQueryMeta();
    }
  }, [datasource.id, metaData.data, execQueryMeta, metaData.fetching]);

  useEffect(() => {
    if (meta) {
      onLoadMeta(datasource.id, meta);
    }
  }, [datasource.id, onLoadMeta, meta]);

  return (
    <div className={cx(s.card, isSelected && s.selected)} onClick={() => onClick(datasource.id)}>
      <div className={s.name}>
        {datasource?.name}
      </div>
      <div className={s.access}>
        <AccessPart
          datasourceMeta={meta}
          datasourcePermissions={config?.datasources?.[datasource?.id]?.cubes}
        />
        <div className={s.sourceType}>
          <img
            alt=''
            src={icon}
            className={s.icon}
          />
          <span className={s.datasource}>{datasource?.db_type}</span>
        </div>
      </div>
    </div>
  );
};

DatasourceCard.propTypes = {
  datasource: PropTypes.object,
  isSelected: PropTypes.bool,
  config: PropTypes.object,
  onClick: PropTypes.func,
  onLoadMeta: PropTypes.func,
};

DatasourceCard.defaultProps = {
  datasource: {},
  isSelected: false,
  config: {},
  onClick: () => {},
  onLoadMeta: () => {},
};

export default DatasourceCard;
