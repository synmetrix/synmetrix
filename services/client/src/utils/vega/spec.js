import { get, getOr } from 'unchanged';
// import * as vl from 'vega-lite-api';
import * as vl from 'vega-lite-api';

import { colors, getFieldType } from 'utils/vega/renderOptions';
import pickKeys from 'utils/pickKeys';
import genName from 'utils/genName';

// https://vega.github.io/vega-lite/docs/field.html
// If field names contain dots or brackets but are not nested, use \\ to escape dots and brackets
const escapeDots = field => field && field.replace('.', '\\.');

// const getFieldSort = (field, fieldConfig = {}) => {
//   const res = {};
//
//   if (field) {
//     res.field = escapeDots(field);
//     res.op = 'valid';
//   }
//
//   if (fieldConfig.orderDirection) {
//     res.order = fieldConfig.orderDirection;
//   }
//
//   return res;
// };

const getFieldEncoding = (selectedMembers, field, chartConfig = {}, axis = null) => {
  const defaultType =  getFieldType(get([field, 'type'], selectedMembers));

  const xFieldForcedType = getOr(null, 'xType', chartConfig);
  const yFieldForcedType = getOr(null, 'yType', chartConfig);

  const fieldType = {
    x: xFieldForcedType || defaultType,
    x2: xFieldForcedType || defaultType,
    y: yFieldForcedType || defaultType,
    y2: yFieldForcedType || defaultType,
  };

  return {
    field: escapeDots(field),
    type: fieldType[axis] || defaultType,
    title: get([field, 'title'], selectedMembers),
  };
};

const calculateChartSize = (element, selectedMembers, config) => {
  let chartHeight = element.offsetHeight * 0.96; // - 35
  let chartWidth = element.offsetWidth * 0.96 - 82;

  const legendPadding = Number(config.legendPadding || 0);
  if (config.legendPosition === 'top' || config.legendPosition === 'bottom') {
    chartHeight -= (40 + 18 + legendPadding);
  }

  if (config.legendPosition === 'left' || config.legendPosition === 'right') {
    chartWidth -= (70 + legendPadding);
  }

  if (getFieldEncoding(selectedMembers, config.y, config, 'y').type === 'nominal') {
    if (config.axisLabelAngle === 0 || typeof config.axisLabelAngle === 'undefined') {
      chartWidth -= 47;
    }
  }

  if (getFieldEncoding(selectedMembers, config.x, config, 'x').type === 'nominal') {
    if (Math.abs(config.axisLabelAngle) !== 0 || typeof config.axisLabelAngle === 'undefined') {
      chartHeight -= 59;
    }
  }

  if (config.independentAxis === 'yes') {
    chartWidth -= 52;
  }

  // manual-sizing for chart height
  if (config.fixedHeight) {
    chartHeight = Number(config.fixedHeight);
  }

  // manual-sizing for chart width
  if (config.fixedWidth) {
    chartWidth = Number(config.fixedWidth);
  }

  return {
    chartHeight,
    chartWidth,
  };
};

// construct the tooltip with appropriate formatting
const constructTooltip = (selectedMembers, chartConfig) => {
  const tooltipFields = [];

  Object.keys(selectedMembers).forEach((memberKey, i) => {
    if ((chartConfig.includeInTooltip || []).includes(memberKey)) {
      const tip = getFieldEncoding(selectedMembers, memberKey, chartConfig);

      if (tip.type === 'temporal') {
        tip.format = chartConfig.timeUnit;
      }

      tooltipFields.push(tip);
    }
  });

  return tooltipFields;
};

const initChartSpec = (selectedMembers, config) => {
  const spec = {
    config: {
      axis: {
        titleFont: 'Open Sans,Helvetica,Arial,sans-serif',
        labelFont: 'Open Sans,Helvetica,Arial,sans-serif',
        labelColor: '#666666',
        titleColor: '#666666',
        titleFontWeight: 'bold',
        gridOpacity: config.gridOpacity,
        minExtent: 35,
      },
      header: {
        titleFont: 'Open Sans,Helvetica,Arial,sans-serif',
        labelFont: 'Open Sans,Helvetica,Arial,sans-serif',
        labelColor: '#666666',
        titleColor: '#666666',
        titleFontWeight: 'bold'
      },
      legend: {
        titleFont: 'Open Sans,Helvetica,Arial,sans-serif',
        labelFont: 'Open Sans,Helvetica,Arial,sans-serif',
        labelColor: '#666666',
        orient: config.legendPosition,
        titleColor: '#666666',
        titleFontWeight: 'bold',
        symbolSize: 150
      },
      range: {
        category: [
          '#4285F4',
          '#DB4437',
          '#F4B400',
          '#0F9D58',
          '#AB47BC',
          '#00ACC1',
          '#FF7043',
          '#9E9D24',
          '#5C6BC0',
          '#F06292',
          '#00796B',
          '#C2185B',
        ],
        heatmap: ['#c6dafc', '#5e97f6', '#2a56c6'],
      },
      scale: { bandPaddingInner: 0, bandPaddingOuter: 0 },
      text: { baseline: 'middle' }
    },
  };

  if (config.legendColumns) {
    spec.config.legend.columns = config.legendColumns;
  }

  if (config.legendBorder) {
    spec.config.legend.strokeColor = config.legendBorder;
  }

  if (config.legendPadding) {
    spec.config.legend.padding = config.legendPadding;
  }

  if (config.legendRadius) {
    spec.config.legend.cornerRadius = config.legendRadius;
  }

  if (config.axisLabelAngle) {
    spec.config.axis.labelAngle = config.axisLabelAngle;
  }

  return spec;
};

const getFieldScale = (key, fieldType, fieldConfig, chartConfig) => {
  // if none then none scale
  if (!fieldConfig) {
    return null;
  }

  const scaleType = {
    quantitative: 'linear',
    temporal: 'time',
    ordinal: 'ordinal'
  };

  let scale = null;
  if (key.match(/^x\d?$/)) {
    scale = getOr(null, 'xScale', chartConfig);
  }

  if (key.match(/^y\d?$/)) {
    scale = getOr(null, 'yScale', chartConfig);
  }

  const res = {
    type: scale || scaleType[fieldType],
  };

  // if (key === 'y' && (fieldConfig.scaleDomainMin || fieldConfig.scaleDomainMax)) {
  //   res.domain = [fieldConfig.scaleDomainMin, fieldConfig.scaleDomainMax];
  // }

  if (key === 'y' && fieldConfig.unpinY && fieldConfig.unpinY === 'yes') {
    res.zero = false;
  }

  return res;
};

const getFieldColorScheme = (fieldConfig) => {
  const res = {
    scheme: fieldConfig.colorScheme || 'category20b',
  };

  if (fieldConfig.colorScheme) {
    res.range = colors[fieldConfig.colorScheme] || fieldConfig.colorScheme;
  }

  return res;
};

const getFieldImpute = (fieldConfig) => {
  const { imputeMissing } = fieldConfig || {};

  if (!imputeMissing) {
    return null;
  }

  const res = {};

  if (imputeMissing === 'zeros') {
    res.value = 0;
  } else {
    res.method = imputeMissing;
  }

  return res;
};

const getAxisEncoding = (key, selectedMembers, field, fieldConfig, chartConfig = {}) => {
  const fieldEncoding = getFieldEncoding(selectedMembers, field, chartConfig, key);
  const fieldScale = getFieldScale(key, fieldEncoding.type, fieldConfig, chartConfig);

  if (key === 'x' && chartConfig && chartConfig.interactive === 'detailed') {
    fieldEncoding.scale = { domain: { selection: 'brush' }, ...fieldScale };
  } else if (fieldScale) {
    fieldEncoding.scale = fieldScale;
  }

  const fieldImpute = getFieldImpute(fieldConfig);
  if (fieldImpute) {
    fieldEncoding.impute = fieldImpute;
  }

  if (chartConfig.showTitles === 'no') {
    fieldEncoding.title = null;
  }

  if (chartConfig.dataSample && chartConfig.dataSample.length && ['ordinal', 'nominal'].includes(fieldEncoding.type)) {
    fieldEncoding.axis = {
      labelAngle: 30,
      labelOverlap: 'parity',
      values: chartConfig.dataSample.map(row => row[field]).sort()
    };
  }

  const func = vl[key];
  return func(fieldEncoding);
};

const vegaMarkToChart = {
  line: 'markLine',
  bar: 'markBar',
  area: 'markArea',
  text: 'markText',
  tick: 'markTick',
  circle: 'markCircle',
  rule: 'markRule',
  point: 'markPoint',
  // pie
  // https://github.com/vega/vega-lite/issues/408#issuecomment-373870307
};

export const layerKeyRegex = /layer(\d+)__/i;

const lineCharts = ['line', 'trail', 'area'];
const getMarkSettings = (layerConfig) => {
  const colorEncoding = getFieldColorScheme(layerConfig);

  const res = {
    color: '#3D52B9',
    // order: false,
    clip: true,
  };

  if (colorEncoding.range) {
    res.color = get('range.0', colorEncoding);
  }

  if (lineCharts.includes(layerConfig.markType)) {
    // color the stoke if it's a line to avoid it being filled
    res.stroke = layerConfig.fixedColor;
  } else {
    // color the fill of the mark if not a line
    res.fill = layerConfig.fixedColor;
  }

  return res;
};

const getTooltipsLayer = (selectedMembers, firstLayer, chartConfig) => {
  const selectionRule = vl.selectPoint('hover')
      .on('mouseover')
      .nearest(chartConfig.nearest === 'yes');

  const selectionAxis = getAxisEncoding('x', selectedMembers, firstLayer.x, firstLayer, chartConfig);
  selectionAxis.title = null;

  const allTooltips = constructTooltip(selectedMembers, chartConfig);

  if (!allTooltips.length) {
    return null;
  }

  const tooltipLayer = vl.markRule()
      .name('tooltip')
      .encode(
        vl.x(selectionAxis),
        vl.tooltip(allTooltips),
        vl.color().if(selectionRule.empty(false), { value: 'black' }).value('transparent')
      ).params(selectionRule);

  return tooltipLayer;
};

const getDetailedLayer = (selectedMembers, firstLayer, { xType, yType }) => {
  const selectionRule = vl.selectInterval('brush').encodings(['x']);

  const axisX = getAxisEncoding('x', selectedMembers, firstLayer.x, firstLayer, { xType, yType });
  const axisY = getAxisEncoding('y', selectedMembers, firstLayer.y, firstLayer, { xType, yType });

  const mark = getMarkSettings(firstLayer);

  const detailedLayer = vl.markRule(firstLayer.markType, mark)
      .select(selectionRule)
      .encode(
        vl.x(axisX, { title: '' }),
        vl.y(axisY, { title: '' })
      );

  return detailedLayer;
};

const isValid = (layerConfigs) => {
  const axesKeys = ['x', 'x2', 'y', 'y2'];

  const validLayers = Object.keys(layerConfigs || {}).map(layerId => {
    const axesValues = pickKeys(axesKeys, layerConfigs[layerId]);

    if (!axesValues) {
      return false;
    }

    const validKeys = Object.keys(axesValues).filter(key => !!axesValues[key]);

    const hasAxis1 = validKeys.includes('x') && validKeys.includes('y');
    const hasAxis2 = validKeys.includes('x2') && validKeys.includes('y2');

    return hasAxis1 || hasAxis2;
  });

  const anyValid = validLayers.some(validLayer => !!validLayer);
  return anyValid;
};

const getRandomElements = (sourceArray, count) => {
  const result = [];

  for (let i = 0; i < count; i += 1) {
    result.push(sourceArray[Math.floor(Math.random() * sourceArray.length)]);
  }

  return result;
};

class VegaSpec {
  constructor(selectedMembers, config, data) {
    this.selectedMembers = selectedMembers || {};
    this.config = config;
    this.data = data;
  }

  createLayer(layerConfig, chartConfig = {}) {
    if (!layerConfig.markType) {
      throw new Error('Can\'t find mark type of the layer');
    }

    const vlMarkF = vegaMarkToChart[layerConfig.markType];

    if (!vlMarkF) {
      return null;
    }

    const markSettings = getMarkSettings(layerConfig);

    let zoomSelection = null;
    if (chartConfig.interactive === 'zoom') {
      const name = genName(4);

      zoomSelection = vl.selectInterval(name)
          .bind('scales')
          .zoom('wheel![event.shiftKey]');
    }

    let mark = vl[vlMarkF](markSettings);

    const encoders = [];

    if (layerConfig.x) {
      const x = getAxisEncoding(
        'x',
        this.selectedMembers,
        layerConfig.x,
        layerConfig,
        chartConfig
      );

      encoders.push(x);
    }

    if (layerConfig.x2) {
      const x2 = getAxisEncoding('x2', this.selectedMembers, layerConfig.x2, {}, chartConfig);
      encoders.push(x2);
    }

    if (layerConfig.y) {
      const y = getAxisEncoding(
        'y',
        this.selectedMembers,
        layerConfig.y,
        layerConfig,
        chartConfig
      );

      encoders.push(y);
    }

    if (layerConfig.y2) {
      const y2 = getAxisEncoding('y2', this.selectedMembers, layerConfig.y2, {}, chartConfig);
      encoders.push(y2);
    }

    if (layerConfig.color) {
      const colorField = getFieldEncoding(this.selectedMembers, layerConfig.color);

      const colorFieldScale = getFieldColorScheme(layerConfig);
      const color = vl.color({ ...colorField, scale: colorFieldScale });

      encoders.push(color);
    }

    if (!encoders.length) {
      return null;
    }

    mark = mark.encode(...encoders.filter(Boolean));

    if (zoomSelection) {
      mark = mark.select(zoomSelection);
    }

    return mark;
  }

  build(element) {
    const { config, data, selectedMembers } = this;

    const sizes = calculateChartSize(element, selectedMembers, config);

    const layerConfigs = {};
    Object.entries(config).forEach(([key, value]) => {
      const layerMatch = key.match(layerKeyRegex);

      if (layerMatch && layerMatch.length) {
        const [fullMatch, layerId] = layerMatch;
        const layerKey = key.replace(fullMatch, '');

        if (!(layerId in layerConfigs)) {
          layerConfigs[layerId] = {};
        }

        layerConfigs[layerId][layerKey] = value;
      }
    });

    const isValidConfig = isValid(layerConfigs);
    if (!isValidConfig) {
      return {};
    }

    config.dataSample = getRandomElements(data.values, 5);
    const layers = Object.values(layerConfigs).map(layerConfig => this.createLayer(layerConfig, config));

    const chartSpec = initChartSpec(sizes, selectedMembers, config);

    if (config.tooltip === 'yes' && Object.values(layerConfigs).length) {
      const tooltipsLayer = getTooltipsLayer(selectedMembers, Object.values(layerConfigs)[0], config);
      layers.push(tooltipsLayer);
    }

    let resolve = null;
    if (config.independentAxis === 'yes') {
      resolve = { scale: { y: 'independent' } };
    }

    const mainChart = vl.layer(...layers.filter(Boolean))
        .resolve(resolve)
        .width(sizes.chartWidth)
        .height(sizes.chartHeight);

    const charts = [
      mainChart,
    ];

    if (config.interactive === 'detailed') {
      const detailedLayer = getDetailedLayer(selectedMembers, Object.values(layerConfigs)[0], config);
      const detailedChart = vl.layer(detailedLayer)
          .width(sizes.chartWidth)
          .height(60);

      charts.push(
        detailedChart
      );
    }

    const spec = vl.data(data).vconcat(
      ...charts,
    );

    return {
      ...chartSpec,
      ...spec.toSpec()
    };
  }
}
export default VegaSpec;
