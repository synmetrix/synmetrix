import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { Tabs, Input, Icon } from 'antd';
import PartitionsTable from 'components/PartitionsTable';
import PreAggregationPreview from './PreAggregationPreview';

const { TabPane } = Tabs;
const { TextArea } = Input;

const PreAggregation = ({ data, datasourceId }) => {
  const { t } = useTranslation();
  console.log(data);

  const refresh = useMemo(() => {
    return Object.entries(data?.preAggregation?.refreshKey || {}).reduce((acc, [key, val]) => {
      return `${acc} ${key[0].toUpperCase() + key.substring(1)} ${val}`;
    }, '');
  }, [data]);

  const definition = useMemo(() => {
    try {
      return JSON.stringify(data?.preAggregation, undefined, 2);
    } catch (e) {
      return null;
    }
  }, [data]);

  const isScheduled = useMemo(() => data?.preAggregation?.scheduledRefresh, [data]);
  const isIncremental = useMemo(() => data.preAggregation?.refreshKey?.incremental, [data]);

  return (
    <div>
      <div>
        <b>{t('Refresh')}</b>
        <br />
        <Icon type="clock-circle" /> {refresh}
        <br />
        <Icon type={isScheduled ? 'check' : 'close'} /> {t('Automated refreshes')}
        <br />
        <Icon type={isIncremental ? 'check' : 'close'} /> {t('Incremental update')}
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Partitions" key="1">
          <PartitionsTable partitions={data?.partitions} />
        </TabPane>
        <TabPane tab="Definition" key="2">
          <TextArea
            disabled
            rows={20}
            value={definition}
            style={{ color: 'rgba(0, 0, 0, 0.65)', backgroundColor: 'white' }}
          />
        </TabPane>
        <TabPane tab="Preview" key="3">
          <PreAggregationPreview datasourceId={datasourceId} preAggregationId={data?.preAggregation?.id} />
        </TabPane>
        <TabPane tab="Used By" key="4">
          qwe
        </TabPane>
        <TabPane tab="Indexes" key="5">
          qwe
        </TabPane>
      </Tabs>
    </div>
  );
};

PreAggregation.propTypes = {
  data: PropTypes.object,
  datasourceId: PropTypes.string,
};

PreAggregation.defaultProps = {
  data: {},
  datasourceId: null,
};

export default PreAggregation;
