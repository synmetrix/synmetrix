import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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

const DatasourceCard = ({ datasource, accessList, isSelected, onClick, onLoadMeta }) => {
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
    if (datasource.id && !currentMeta.length && !metaData.fetching) {
      execQueryMeta();
    }
  }, [datasource.id, metaData.data, execQueryMeta, currentMeta, metaData.fetching]);

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
          datasourcePermissions={accessList?.datasources?.[datasource?.id]?.cubes}
        />
        <div>
          <div className={s.sourceType}>
            <img
              alt=''
              style={{
                height: 14,
                width: 14,
              }}
              src={icon}
            />
            <span style={{ fontSize: 10 }}>{datasource?.db_type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

DatasourceCard.propTypes = {
  datasource: PropTypes.object,
  isSelected: PropTypes.bool,
  accessList: PropTypes.object,
  onClick: PropTypes.func,
  onLoadMeta: PropTypes.func,
};

DatasourceCard.defaultProps = {
  datasource: {},
  isSelected: false,
  accessList: {},
  onClick: () => {},
  onLoadMeta: () => {},
};

export default DatasourceCard;
