/* eslint-disable no-param-reassign */
import React, { useMemo } from 'react';
import produce from 'immer';

import useQuery from 'hooks/useQuery';
import useSources, { datasourceMetaQuery } from 'hooks/useSources';
import { granularities } from 'hooks/useDataSourceMeta';

const commonFormItems = {
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
  timeDimension: {
    label: 'Time Dimension',
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
};

const triggerFormItems = {
  trigger_divider: {
    label: 'Trigger settings',
    display: 'divider'
  },
  schedule: {
    label: (<>Schedule (<a target="_blank" rel="noopener noreferrer" href="https://crontab.guru/">Build cron expression</a>)</>),
    name: 'Schedule',
    required: true,
    placeholder: 'Minute Hour Day Month Weekday',
    default: '* * * * *',
    suffix: 'in UTC timezone'
  },
};

const deliveryFormItems = {
  webhook: {
    'delivery_config.url': {
      label: 'URL',
      required: true,
      placeholder: 'https://webhook.catch',
    },
  },
  slack: {
    'delivery_config.url': {
      label: 'Slack webhook URL',
      required: true,
      placeholder: 'https://hooks.slack.com',
    },
  },
  email: {
    'delivery_config.address': {
      label: 'Email',
      required: true,
      placeholder: 'one@example.com',
    },
  },
};

const triggerFormItemsByEntity = {
  alert: {
    ...triggerFormItems,
    'trigger_config.lowerBound': {
      label: 'Lower Bound',
      type: 'number',
      span: 12
    },
    'trigger_config.upperBound': {
      label: 'Upper Bound',
      type: 'number',
      span: 12
    },
    'trigger_config.requestTimeout': {
      label: 'Request Timeout (minutes)',
      required: true,
      display: 'text',
      type: 'number',
      default: 1,
      step: 1,
      min: 1,
      span: 12
    },
    'trigger_config.timeoutOnFire': {
      label: 'Timeout On Fire (minutes)',
      display: 'text',
      type: 'number',
      step: 1,
      default: 0,
      min: 0,
      span: 12
    },
  },
  report: triggerFormItems,
};

export default ({ form, initialValues, entity = 'alert' }) => {
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
      const deliveryFormItemsByType = {
        delivery_divider: {
          label: 'Delivery settings',
          display: 'divider'
        },
        ...(deliveryFormItems[deliveryType?.toLowerCase()] || {})
      };

      const combinedFormItems = {
        ...commonFormItems,
        ...(triggerFormItemsByEntity[entity] || {}),
        ...deliveryFormItemsByType,
      };

      const datasourceSelectorValues = allDatasources?.map(ds => ({ [ds.name]: ds.id })) || [];
  
      const cubeSelectorValues = cubesMeta?.map(cube => ({ [cube.title]: cube.name })) || [];
  
      const measureSelectorValues = selectedCube?.measures.map(measure => ({ [measure.title]: measure.name })) || [];
      const timeDimensionSelectorValues = selectedCube?.dimensions
          ?.filter(dimension => dimension.type === 'time')
          ?.map(dimension => ({ [dimension.shortTitle]: dimension.name })) || [];

      const setupAlertBoundsValidation = draft => {
        draft['trigger_config.lowerBound'].rules = [];
        draft['trigger_config.upperBound'].rules = [];

        const validateBounds = async (value, comparableValue) => {
          if (value === null) {
            return Promise.resolve();
          }

          const numericValue = parseFloat(value);
          const numericComparableValue = parseFloat(comparableValue);

          if (numericValue >= numericComparableValue) {
            return Promise.reject(new Error());
          }

          return Promise.resolve();
        };

        const lowerBoundValue = form.getFieldValue('trigger_config.lowerBound');
        const upperBoundValue = form.getFieldValue('trigger_config.upperBound');
        const areBoundsRequired = !lowerBoundValue && !upperBoundValue;

        draft['trigger_config.lowerBound'].rules.push(
          { required: areBoundsRequired, message: 'At least one bound is required' },
        );
        draft['trigger_config.upperBound'].rules.push(
          { required: areBoundsRequired, message: 'At least one bound is required' },
        );

        draft['trigger_config.lowerBound'].rules.push(
          {
            message: 'Lower bound must be less than upper one',
            validator: async (rule, value) => validateBounds(value, upperBoundValue),
          },
        );

        draft['trigger_config.upperBound'].rules.push(
          {
            message: 'Upper bound must be bigger than lower one',
            validator: async (rule, value) => validateBounds(lowerBoundValue, value),
          },
        );
      };

      return produce(combinedFormItems, draft => {
        draft.datasource_id.values = datasourceSelectorValues;
  
        draft.cube.display = datasourceId ? 'select' : 'none';
        draft.cube.values = cubeSelectorValues;

        draft.measure.values = measureSelectorValues;
        draft.measure.display = selectedCube ? 'select' : 'none';

        draft.timeDimension.values = timeDimensionSelectorValues;
        draft.timeDimension.display = selectedCube ? 'select' : 'none';

        draft.granularity.values = granularities.map(g => ({ [g.title]: g.name }));
        draft.granularity.display = selectedCube ? 'select' : 'none';

        draft.since.values = form.getFieldValue('since') ?? initialSince;
        draft.since.display = selectedCube ? 'date' : 'none';
        draft.since.onChange = (value) => form.setFieldsValue({ since: value });

        draft.limit.display = selectedCube ? 'text' : 'none';

        if (entity === 'alert') {
          setupAlertBoundsValidation(draft);
        }
      });
    },
    [deliveryType, entity, allDatasources, cubesMeta, selectedCube, datasourceId, form, initialSince]
  );

  return config;
};
