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
    span: 8
  },
  granularity: {
    label: 'Granularity',
    required: true,
    span: 8
  },
  date_range: {
    label: 'Date Range',
    required: true,
    type: 'filter',
    span: 8
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
    url: {
      label: 'URL',
      required: true,
      placeholder: 'https://webhook.catch',
    },
  },
  slack: {
    ...defaultFormItems,
    channel_name: {
      label: 'Channel Name',
      required: true,
      placeholder: '#general',
    },
  },
  email: {
    ...defaultFormItems,
    address: {
      label: 'Email',
      required: true,
      placeholder: 'one@example.com',
    },
  },
};

export default ({ form, deliveryType }) => {
  const { all: allDatasources } = useSources({ pauseQueryAll: false });

  const datasourceId = useMemo(() => form.getFieldValue('datasource_id'), [form]);

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
  
        draft.date_range.values = form.getFieldValue('date_range') ?? [];
        draft.date_range.display = selectedCube ? 'date' : 'none';
        draft.date_range.onChange = (value) => form.setFieldsValue({ date_range: value });
      });
    },
    [deliveryType, allDatasources, cubesMeta, selectedCube, datasourceId, form]
  );

  return config;
};
