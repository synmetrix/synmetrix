import React, { useState, useMemo } from 'react';

import { Select, Tabs, Button, Input } from 'antd';

import { useTranslation } from 'react-i18next';

import PreAggregationsTable from 'components/PreAggregationsTable';
import formatTime from 'utils/formatTime';
import PreAggregation from 'components/PreAggregation';

import useAppSettings from 'hooks/useAppSettings';
import useCurrentUserState from 'hooks/useCurrentUserState';
import usePreAggregations from 'hooks/usePreAggregations';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const PreAggregationsTab = () => {
  const { t } = useTranslation();
  const { withAuthPrefix } = useAppSettings();
  const [datasourceId, setDatasource] = useState();
  const { currentUserState: currentUser } = useCurrentUserState();
  const basePath = withAuthPrefix('/logs/preaggregations');

  const {
    preAggregations,
    queries: {
      execQueryPreAggregations,
    },
  } = usePreAggregations({
    datasourceId,
  });

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

  console.log(preAggregations);
  const preAggregationsData = useMemo(() => (preAggregations.partitions || []).map(p => ({
    name: p?.preAggregation?.id,
    last_time: formatTime(p?.partitions?.[0]?.versionEntries?.sort()?.[0]?.last_updated_at),
    partitions: p?.partitions?.length,
  })), [preAggregations.partitions]);

  // const breadcrumbs = [
  //   { path: basePath, title: 'PreAggregations' },
  //   params?.rowId && { path: `${basePath}/${params?.rowId}`, title: params?.rowId },
  // ].filter(v => !!v);

  return (
    <div>
      <Button onClick={() => execQueryPreAggregations()}>execQueryPreAggregations</Button>
      <Select defaultActiveFirstOption style={{ width: 200 }} onChange={(value) => setDatasource(value)}>
        {currentUser?.datasources?.map(d => (<Option value={d.id}>{d.name}</Option>))}
      </Select>
      {error && error}
      {preAggregationsData && (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Pre-Aggregations" key="1">
            <PreAggregationsTable datasource={preAggregationsData} />
            <PreAggregation data={preAggregations?.partitions?.[0]} datasourceId={datasourceId} />
          </TabPane>
          <TabPane tab="Build History" key="2">
            history here
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

PreAggregationsTab.propTypes = {
};

PreAggregationsTab.defaultProps = {
};

export default PreAggregationsTab;
