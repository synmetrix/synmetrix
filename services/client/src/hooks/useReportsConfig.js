/* eslint-disable no-param-reassign */
import { useMemo } from 'react';
import produce from 'immer';

import useQuery from 'hooks/useQuery';
import useSources, { datasourceMetaQuery } from 'hooks/useSources';

const defaultFormItems = {
  exploration_divider: {
    label: 'Data settings',
    display: 'divider'
  },
  datasource_id: {
    label: 'Datasource',
    required: true,
    display: 'select'
  },
  cube: {
    label: 'Cube',
    required: true
  },
  measure: {
    label: 'Measure',
    required: true,
    span: 12
  },
  granularity: {
    label: 'Granularity',
    required: true,
    span: 12
  },
  since: {
    label: 'Since',
    required: true,
    type: 'filter',
    span: 12
  },
  limit: {
    label: 'Limit',
    required: true,
    type: 'number',
    min: 1,
    max: 1000,
    span: 12
  },
  delivery_divider: {
    label: 'Delivery settings',
    display: 'divider'
  },
  schedule: {
    label: 'Cron Schedule (UTC)',
    required: true,
    placeholder: 'Minute Hour Day Month Weekday',
    default: '* * * * *'
  },
};

const deliveryFormItems = {
  default: defaultFormItems,
  webhook: {
    ...defaultFormItems,
    'delivery_config.url': {
      label: 'URL',
      required: true,
      placeholder: 'https://webhook.catch',
    },
  },
  slack: {
    ...defaultFormItems,
    'delivery_config.channel_name': {
      label: 'Channel Name',
      required: true,
      placeholder: '#general',
    },
  },
  email: {
    ...defaultFormItems,
    'delivery_config.address': {
      label: 'Email',
      required: true,
      placeholder: 'one@example.com',
    },
  },
};

export default ({ form, initialValues }) => {
  const { all: allDatasources } = useSources({ pauseQueryAll: false });
  const {
    delivery_type: deliveryType,
    datasource_id: initialDatasourceId,
    since: initialSince
  } = initialValues;

  const datasourceId = useMemo(() => form.getFieldValue('datasource_id') || initialDatasourceId, [form, initialDatasourceId]);

  const [metaData] = useQuery({
    query: datasourceMetaQuery,
    pause: false,
    variables: {
      datasource_id: datasourceId,
    },
  }, {
    requestPolicy: 'cache-first',
    role: 'user',
  });

  const cubesMeta = useMemo(() => metaData?.data?.fetch_meta?.cubes || [], [metaData]);
  const selectedCube = useMemo(() => cubesMeta.find(cube => cube.name === form.getFieldValue('cube')), [form, cubesMeta]);

  const config = useMemo(
    () => {
      const defaultConfig = deliveryFormItems[deliveryType && deliveryType.toLowerCase()] || deliveryFormItems.default;
  
      const datasourceSelectorValues = allDatasources?.map(ds => ({ [ds.name]: ds.id })) || [];
  
      const cubeSelectorValues = cubesMeta?.map(cube => ({ [cube.title]: cube.name })) || [];
  
      const measureSelectorValues = selectedCube?.measures.map(measure => ({ [measure.title]: measure.name })) || [];
      const granularitySelectorValues = selectedCube?.dimensions
          ?.filter(dimension => dimension.type === 'time')
          ?.map(dimension => ({ [dimension.shortTitle]: dimension.name })) || [];
  
      return produce(defaultConfig, draft => {
        draft.datasource_id.values = datasourceSelectorValues;
  
        draft.cube.display = datasourceId ? 'select' : 'none';
        draft.cube.values = cubeSelectorValues;

        draft.measure.values = measureSelectorValues;
        draft.measure.display = selectedCube ? 'select' : 'none';

        draft.granularity.values = granularitySelectorValues;
        draft.granularity.display = selectedCube ? 'select' : 'none';

        draft.since.values = form.getFieldValue('since') ?? initialSince;
        draft.since.display = selectedCube ? 'date' : 'none';
        draft.since.onChange = (value) => form.setFieldsValue({ since: value });

        draft.limit.display = selectedCube ? 'text' : 'none';
      });
    },
    [deliveryType, allDatasources, cubesMeta, selectedCube, datasourceId, form, initialSince]
  );

  return config;
};
