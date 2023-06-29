import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Select, Input } from 'antd';

import { useTranslation } from 'react-i18next';

import PreAggregationsTable from 'components/PreAggregationsTable';
import PreAggregation from 'components/PreAggregation';
import Breadcrumbs from 'components/Breadcrumbs';

import useAppSettings from 'hooks/useAppSettings';
import useCurrentUserState from 'hooks/useCurrentUserState';
import usePreAggregations from 'hooks/usePreAggregations';
import useLocation from 'hooks/useLocation';

import formatTime from 'utils/formatTime';

const { TextArea } = Input;
const { Option } = Select;

const PreAggregationsTab = ({ params }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  const { datasourceId, preAggregation } = params;
  const { currentUserState: currentUser } = useCurrentUserState();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix('/logs/preaggregations');

  const {
    preAggregations,
  } = usePreAggregations({
    datasourceId,
  });

  const onClickRow = recordId => {
    setLocation(`${basePath}/${datasourceId}/${recordId}`);
  };
 
  const breadcrumbs = [
    { path: basePath, title: 'PreAggregations' },
    datasourceId && { path: `${basePath}/${datasourceId}`, title: datasourceId },
    datasourceId && preAggregation && { path: `${basePath}/${datasourceId}/${preAggregation}`, title: preAggregation },
  ].filter(v => !!v);

  const error = useMemo(() => {
    if (preAggregations.error) {
      return (
        <div>
          <div style={{ margin: '10px 0' }}><b>{t('Error: ')}</b>{preAggregations.error}</div>
          {preAggregations.stack && (
            <TextArea
              disabled
              rows={15}
              value={preAggregations.stack}
              style={{ color: 'rgba(0, 0, 0, 0.65)', backgroundColor: '#ffffff' }}
            />
          )}
        </div>
      );
    }

    return null;
  }, [preAggregations.error, preAggregations.stack, t]);

  const preAggregationsData = useMemo(() => (preAggregations.partitions || []).map(p => ({
    id: p?.preAggregation?.preAggregationName,
    name: p?.preAggregation?.id,
    last_time: formatTime(p?.partitions?.[0]?.versionEntries?.sort()?.[0]?.last_updated_at),
    partitions: p?.partitions?.length,
  })), [preAggregations.partitions]);

  const preAggregationData = useMemo(() => preAggregations?.partitions?.find(p => p?.preAggregation?.preAggregationName === preAggregation), [preAggregation, preAggregations.partitions]);

  useEffect(() => {
    if (preAggregation && !preAggregationData) {
      setLocation(`${basePath}/${datasourceId}`);
    }
  }, [preAggregation, preAggregationData, datasourceId, basePath, setLocation]);

  return (
    <div style={{ padding: 10 }}>
      {t('Datasource')}: 
      <Select value={datasourceId} style={{ width: 200 }} onChange={(value) => setLocation(`${basePath}/${value}`)}>
        {currentUser?.datasources?.map(d => (<Option value={d.id}>{d.name}</Option>))}
      </Select>
      <div style={{ marginBottom: 10 }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      {error && error}
      {preAggregationsData && !preAggregation && (
        <>
          <PreAggregationsTable datasource={preAggregationsData} onClickRow={onClickRow} />
        </>
      )}
      {preAggregationsData && preAggregation && (
        <PreAggregation
          datasourceId={datasourceId}
          data={preAggregationData}
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
