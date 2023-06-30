import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Select, Input } from 'antd';

import { useTranslation } from 'react-i18next';

import PreAggregationsTable from 'components/PreAggregationsTable';
import PreAggregation from 'components/PreAggregation';
import Breadcrumbs from 'components/Breadcrumbs';

import useAppSettings from 'hooks/useAppSettings';
import useSources from 'hooks/useSources';
import usePreAggregations from 'hooks/usePreAggregations';
import useLocation from 'hooks/useLocation';

import formatTime from 'utils/formatTime';

const { TextArea } = Input;
const { Option } = Select;

const PreAggregationsTab = ({ params }) => {
  const { datasourceId, preAggregation } = params;

  const { t } = useTranslation();
  const [location, setLocation] = useLocation();

  const { all: allDatasources } = useSources({ pauseQueryAll: false });
  
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix('/logs/preaggregations');

  const {
    allPreAggregations,
    queries: {
      preAggregationsData,
    },
  } = usePreAggregations({
    params: {
      datasourceId,
    },
  });

  const onClickRow = recordId => {
    setLocation(`${basePath}/${datasourceId}/${recordId}`);
  };
 
  const breadcrumbs = [
    datasourceId && { path: `${basePath}/${datasourceId}`, title: datasourceId },
    datasourceId && preAggregation && { path: `${basePath}/${datasourceId}/${preAggregation}`, title: preAggregation },
  ].filter(v => !!v);

  const preAggregations = useMemo(() => (allPreAggregations.partitions || []).map(p => ({
    id: p?.preAggregation?.preAggregationName,
    name: p?.preAggregation?.id,
    last_time: formatTime(p?.partitions?.[0]?.versionEntries?.sort()?.[0]?.last_updated_at),
    partitions: p?.partitions?.length,
  })), [allPreAggregations.partitions]);

  const preAggregationData = useMemo(() => allPreAggregations?.partitions?.find(p => p?.preAggregation?.preAggregationName === preAggregation), [preAggregation, allPreAggregations.partitions]);

  const select = useMemo(() => (
    <Select
      value={datasourceId}
      style={{ width: 200, marginLeft: 5 }}
      onChange={(value) => setLocation(`${basePath}/${value}`)}
    >
      {allDatasources?.map(d => (<Option value={d.id} key={d.id}>{d.name}</Option>))}
    </Select>
  ), [allDatasources, basePath, datasourceId, setLocation]);

  useEffect(() => {
    if (!datasourceId && allDatasources.length) {
      setLocation(`${basePath}/${allDatasources?.[0]?.id}`);
    }
  }, [allDatasources, basePath, datasourceId, setLocation]);

  useEffect(() => {
    if (preAggregation && !preAggregationData && !preAggregationsData.fetching) {
      setLocation(`${basePath}/${datasourceId}/${preAggregation}`);
    }
  }, [preAggregation, preAggregationData, datasourceId, basePath, setLocation, preAggregationsData.fetching]);

  return (
    <div style={{ padding: 10 }}>
      <div style={{ marginBottom: 10 }}>
        {t('Datasource')}:
        {select}
      </div>
      <div style={{ marginBottom: 10 }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      {allPreAggregations.error && (
        <div>
          <div style={{ margin: '10px 0' }}><b>{t('Error: ')}</b>{allPreAggregations.error}</div>
          {allPreAggregations.stack && (
            <TextArea
              disabled
              rows={15}
              value={allPreAggregations.stack}
              style={{ color: 'rgba(0, 0, 0, 0.65)', backgroundColor: '#ffffff' }}
            />
          )}
        </div>
      )}
      {preAggregations && !preAggregation && (
        <PreAggregationsTable datasource={preAggregations} loading={preAggregationsData?.fetching} onClickRow={onClickRow} />
      )}
      {preAggregations && preAggregation && (
        <PreAggregation
          basePath={basePath}
          loading={preAggregationsData.fetching}
          data={preAggregationData}
          datasourceId={datasourceId}
        />
      )}
    </div>
  );
};

PreAggregationsTab.propTypes = {
  params: PropTypes.object,
};

PreAggregationsTab.defaultProps = {
  params: {},
};

export default PreAggregationsTab;
