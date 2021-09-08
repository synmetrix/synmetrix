import React, { useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { get, getOr, set, add } from 'unchanged';
import { useSetState } from 'ahooks';

import { Row, Col, Empty, Button, Icon } from 'antd';
import { VegaLite } from 'react-vega';
import { useTranslation } from 'react-i18next';

import useDimensions from 'hooks/useDimensions';
import { getOptionValue } from 'hooks/useFormItems';
import useAnalyticsQueryMembers from 'hooks/useAnalyticsQueryMembers';
import usePinnedItems from 'hooks/usePinnedItems';

import Loader from 'components/Loader';
import SimpleForm from 'components/SimpleForm';

import vegaRenderOptions from 'utils/vega/renderOptions';
import VegaSpec, { layerKeyRegex, calculateChartSize } from 'utils/vega/spec';
import equals from 'utils/equals';

import s from './ExploreVisualizations.module.css';

const NONE_AXIS_DESC = 'Set axis config in right menu and refresh';

const defaultOpened = ['(1) Axis', 'Tooltip', 'View', 'Type'];

const getLayerSection = (id) => `Layer${id}`;

const getTabConfig = (removeFunc) => ({
  onTabClose: (tabId) => removeFunc(tabId),
  closable: true,
});

const ExploreVisualizations = (props) => {
  const { t } = useTranslation();
  const [, { width }] = useDimensions(document.querySelector('#chart'));

  const {
    rows,
    selectedQueryMembers,
    emptyDesc,
    sectionState,
    setSectionState,
    settings,
    chartId,
  } = props;

  const { baseMembers } = useAnalyticsQueryMembers({ selectedQueryMembers, settings });

  const {
    current,
    queries: {
      currentData,
    },
  } = usePinnedItems({
    params: {
      editId: chartId,
    }
  });

  const defaults = useMemo(() => ({
    defaultX: getOptionValue(baseMembers.dimensions[0] || {}),
    defaultY: getOptionValue(baseMembers.measures[0] || {}),
  }), [baseMembers.dimensions, baseMembers.measures]);

  const [state, updateState] = useSetState({
    description: NONE_AXIS_DESC,
    isReadyToRender: false,
  });

  const formConfig = useMemo(
    () => vegaRenderOptions(baseMembers.allMembers, baseMembers.index, defaults, sectionState.formValues),
    [baseMembers.allMembers, baseMembers.index, defaults, sectionState.formValues]
  );

  useEffect(() => setSectionState(prev => {
    let newFormConfig = formConfig;

    if (prev.formConfig.length) {
      newFormConfig = prev.formConfig.reduce((acc, currSection, n) => {
        const updatedSection = Object.keys(currSection || {}).reduce((secAcc, currKey) => {
          const updatedValue = get([n, currKey], formConfig) || get(currKey, currSection);

          if (updatedValue) {
            return {
              ...secAcc,
              [currKey]: updatedValue,
            };
          }

          return secAcc;
        }, {});

        if (Object.keys(updatedSection).length) {
          return [
            ...acc,
            updatedSection,
          ];
        }

        return acc;
      }, []);
    }

    return {
      ...prev,
      formConfig: newFormConfig,
    };
  }),
  [formConfig, setSectionState]
  );

  useEffect(() => {
    if (!rows.length) {
      updateState({ description: emptyDesc, isReadyToRender: false });
    }
  }, [emptyDesc, rows.length, updateState]);

  const element = { offsetWidth: width, offsetHeight: 400 };

  const handleSubmit = (values) => {
    console.log('Received values of form: ', values);

    const data = {
      values: rows,
    };

    let choosenAxis = Object.entries(values)
        .filter(([key, value]) => key.match(/[xy]\d?$/) && value)
        .map(([, value]) => value);
    // remove duplicates
    choosenAxis = [...new Set(choosenAxis)];

    const oldChoosenAxis = getOr([], 'includeInTooltip', values);
    const isAxisChanged = !equals(choosenAxis, oldChoosenAxis);

    if (isAxisChanged && !oldChoosenAxis.length) {
      values.includeInTooltip = choosenAxis;
    }

    const newSpec = new VegaSpec(baseMembers.index, values, data).build(element);

    setSectionState(prev => ({ ...prev, spec: newSpec }));

    if (newSpec.vconcat && newSpec.vconcat.length) {
      setSectionState(prev => {
        let newFormValues = prev.formValues;
        if (!equals(prev.formValues, values)) {
          newFormValues = values;
        }

        return {
          ...prev,
          formValues: newFormValues,
        };
      });

      updateState({ isReadyToRender: true });

      return true;
    }

    updateState({
      isReadyToRender: false
    });

    return false;
  };

  const removeLayer = useCallback((tabId) => setSectionState(prev => {
    const index = prev.formConfig.findIndex(tab => {
      const [first] = Object.values(tab);
      const match =  first.section.match(tabId);

      if (match) {
        return true;
      }
    });

    const newTabsConfig = {};
    let newFormConfig = prev.formConfig.filter((_, i) => i !== index);
    newFormConfig = newFormConfig.reduce((accTab, curTab, i) => {
      let newTab = curTab;

      if (i !== newFormConfig.length - 1) {
        newTab = Object.entries(curTab).reduce((acc, cur) => {
          const [key, newInput] = cur;

          const layerSection = getLayerSection(i + 1);
          newInput.section = layerSection;

          if (i !== 0) {
            newTabsConfig[layerSection] = getTabConfig(removeLayer);
          }

          return {
            ...acc,
            [key]: newInput
          };
        }, {});
      }

      return [
        ...accTab,
        newTab,
      ];
    }, []);

    return {
      ...prev,
      tabsConfig: newTabsConfig,
      formConfig: newFormConfig,
    };
  }), [setSectionState]);

  const addNewLayer = () => setSectionState(prev => {
    const layerFormFields = {};
    const [layerConfig] = prev.formConfig;

    Object.entries(layerConfig).forEach(([key, value]) => {
      const layerMatch = key.match(layerKeyRegex);

      if (layerMatch && layerMatch.length) {
        const [fullMatch] = layerMatch;
        const layerKey = key.replace(fullMatch, '');

        layerFormFields[layerKey] = value;
      }
    });

    const newLayerId = prev.layerId + 1;
    const layerSection = getLayerSection(prev.formConfig.length);

    const newLayer = Object.entries(layerFormFields).reduce((acc, curr) => {
      const [key, value] = curr;

      return {
        ...acc,
        [`layer${newLayerId}__${key}`]: {
          ...value,
          section: layerSection,
        },
      };
    }, {});

    const oldItem = get(prev.formConfig.length - 1, prev.formConfig);
    // replacing index with layer config
    const newItem = set(prev.formConfig.length - 1, newLayer, prev.formConfig);
    // restoring old index as the last
    const newFormConfig = add(null, oldItem, newItem);
    const tabConfig = getTabConfig(removeLayer);

    return {
      ...prev,
      tabsConfig: {
        ...prev.tabsConfig,
        [layerSection]: tabConfig,
      },
      layerId: newLayerId,
      formConfig: newFormConfig,
    };
  });

  const loadChart = useCallback(() => {
    const specConfig = get('spec_config', current);

    if (!current || !Object.values(specConfig).length) {
      return;
    }

    const layersCount = specConfig.formConfig.length;
    const tabsConfig = {};

    if (layersCount > 2) {
      specConfig.formConfig.forEach((_, i) => {
        if (i > 0) {
          const layerSection = getLayerSection(i + 1);
          const tabConfig = getTabConfig(removeLayer);

          tabsConfig[layerSection] = tabConfig;
        }
      });
    }

    const newSpec = {
      ...current.spec,
      data: {
        values: rows,
      }
    };

    updateState({ isReadyToRender: true });
    setSectionState(prev => ({
      ...prev,
      spec: newSpec,
      ...specConfig,
      tabsConfig: {
        ...tabsConfig,
      },
    }));
  },
  [current, removeLayer, rows, setSectionState, updateState]
  );

  useEffect(() => {
    if (chartId && Object.keys(current || {}).length) {
      loadChart();
    }
  },
  [chartId, current, loadChart]
  );

  const plainFormConfig = useMemo(
    () => (sectionState.formConfig || []).reduce((acc, curr) => {
      if (!curr) {
        return acc;
      }

      return {
        ...acc,
        ...curr,
      };
    }, {}),
    [sectionState.formConfig]
  );

  const sizes = calculateChartSize(element, baseMembers.index, sectionState.formValues);

  return (
    <Row key="form">
      <Col lg={16} md={16} sm={24} xs={24}>
        <Loader spinning={chartId && currentData.fetching}>
          <div style={{ width: '100%' }} id="chart">
            {state.isReadyToRender ?
              <VegaLite spec={sectionState.spec} width={sizes.chartWidth} />
            :
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={state.description} />}
          </div>
        </Loader>
      </Col>
      <Col lg={8} md={8} sm={24} xs={24}>
        <SimpleForm
          config={plainFormConfig}
          onSubmit={handleSubmit}
          collapseActiveKeys={defaultOpened}
          itemClassName={{ [s.formItem]: true }}
          tabsConfig={sectionState.tabsConfig}
          initialValues={sectionState.formValues}
          autoSubmit
        >
          {(onFormSubmit) => (
            <Row type="flex" style={{ paddingTop: 12, paddingRight: 12 }}>
              <Col lg={12} xs={24}>
                <div style={{ paddingRight: 6 }}>
                  <Button onClick={addNewLayer} type="primary" ghost block>
                    <Icon type="plus" />
                    {t('Add Layer')}
                  </Button>
                </div>
              </Col>
              <Col lg={12} xs={24}>
                <div style={{ paddingLeft: 6 }}>
                  <Button onClick={onFormSubmit} block>
                    <Icon type="reload" />
                    {t('Refresh')}
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </SimpleForm>
      </Col>
    </Row>
  );
};

ExploreVisualizations.propTypes = {
  selectedQueryMembers: PropTypes.shape({
    measures: PropTypes.array,
    dimensions: PropTypes.array,
  }).isRequired,
  rows: PropTypes.array,
  emptyDesc: PropTypes.string,
  sectionState: PropTypes.shape({
    spec: PropTypes.object,
    tabsConfig: PropTypes.object,
    formConfig: PropTypes.array,
    formValues: PropTypes.object,
  }).isRequired,
  setSectionState: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  chartId: PropTypes.string,
};

ExploreVisualizations.defaultProps = {
  rows: [],
  emptyDesc: 'No Data',
  chartId: null,
};

export default ExploreVisualizations;
