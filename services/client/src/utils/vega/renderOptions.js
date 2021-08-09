import { get } from 'unchanged';
import { discrete, continuous } from './palettes';

const getColors = (palette) => {
  const n = parseInt(palette.length / 6, 10);
  const c = new Array(n);

  let i = 0;
  while (i < n) c[i] = `#${  palette.slice(i * 6, ++i * 6)}`;
  return c;
};

const defaultColors = {
  looker: ['#3eb0d5', '#B1399E', '#C2DD67', '#592EC2', '#4276BE', '#72D16D', '#FFD95F', '#B32F37', '#9174F0', '#E57947', '#75E2E2', '#FBB555'],
  'looker-vivid': ['#3D52B9', '#08B248', '#A918B4', '#FC2E31', '#FC9200', '#2B99F7', '#C9DC10', '#FA2F90', '#FCBF00', '#24BED5', '#149888', '#6F38BB', '#8B97D5', '#6BD191', '#CB74D2', '#FD8283', '#FDBE66', '#DFEA70'],
};

const allColors = { ...discrete, ...continuous };
export const colors = Object.keys(allColors).reduce((acc, schemaName) =>{
  const colorsArr = getColors(allColors[schemaName]);

  return {
    ...acc,
    [schemaName]: colorsArr,
  };
}, defaultColors);

export const getFieldType = (memberType, defaultType = 'number') => {
  const fieldType = {
    number: 'quantitative',
    string: 'ordinal',
    boolean: 'nominal',
    geo: 'geojson',
    time: 'temporal',
  };

  return fieldType[memberType] || fieldType[defaultType];
};

const vegaColorSchemas = [
  { Looker: 'looker' },
  { 'Looker-vivid': 'looker-vivid' },
  { 'Tableau 20': 'tableau20' },
  { 'Pastel 1': 'pastel1' },
  { 'Pastel 2': 'pastel2' },
  { 'Set 1': 'set1' },
  { 'Set 2': 'set2' },
  { 'Set 3': 'set3' },
  { 'Category 20b (Categorical)': 'category20b' },
  { 'Category 20c (Categorical)': 'category20c' },
  { Greys: 'greys' },
  { 'Warm Greys': 'warmGreys' },
  { Browns: 'browns' },
  { 'Light Grey Red': 'lightGreyRed' },
  { 'Dark Multi': 'darkMulti' },
  { Spectral: 'spectral' },
];

const markTypes = [
  { Bar: 'bar' },
  { Rule: 'rule' },
  { Circle: 'circle' },
  { Tick: 'tick' },
  // { 'Box Plot': 'boxplot' },
  { Line: 'line' },
  // { Rect: 'rect' },
  { Area: 'area' },
  { Point: 'point' },
  // { Trail: 'trail' }
];

const quantScales = [
  { Linear: 'linear' },
  { Logarithmic: 'log' },
  { Power: 'pow' },
  { 'Symmetric log': 'symlog' },
  { 'Square Root': 'sqrt' },
];

const timeScales = [
  { Time: 'time' },
  { UTC: 'utc' },
];

const ordinalScales = [
  { Ordinal: 'ordinal' },
  { Band: 'band' },
];

const encodingTypes = [
  { Temporal: 'temporal' },
  { Quantitative: 'quantitative' },
  { Ordinal: 'ordinal' },
  { Nominal: 'nominal' },
];

const typeToScales = {
  quantitative: quantScales,
  ordinal: timeScales,
  nominal: ordinalScales,
  geojson: ordinalScales,
  temporal: timeScales,
};

export default (allMembers, allMembersIndex, defaults, formValues = {}) => {
  const { defaultX, defaultY } = defaults;
  const layerFormConfig = {};

  const fieldType = (field, defaultField) => getFieldType(
    get([field, 'type'], allMembersIndex) || get([defaultField, 'type'], allMembersIndex)
  );

  layerFormConfig.layer1__x = {
    label: 'X',
    section: 'Layer1',
    subSection: '(1) Axis',
    type: 'string',
    display: 'select',
    showSearch: true,
    values: allMembers,
    default: defaultX,
    placeholder: 'none',
  };
  layerFormConfig.layer1__y = {
    label: 'Y',
    section: 'Layer1',
    subSection: '(1) Axis',
    type: 'string',
    display: 'select',
    showSearch: true,
    values: allMembers,
    default: defaultY,
    placeholder: 'none',
  };
  // Mark config options
  layerFormConfig.layer1__markType = {
    label: 'Mark Type',
    section: 'Layer1',
    subSection: '(1) Axis',
    type: 'string',
    display: 'select',
    showSearch: true,
    default: 'line',
    placeholder: 'none',
    allowClear: false,
    values: markTypes,
  };
  layerFormConfig.layer1__color = {
    label: 'Category',
    section: 'Layer1',
    subSection: '(1) Axis',
    type: 'string',
    display: 'select',
    showSearch: true,
    values: allMembers,
    default: '',
    placeholder: 'none',
  };

  layerFormConfig.layer1__x2 = {
    label: 'X2',
    section: 'Layer1',
    subSection: '(2) Axis',
    type: 'string',
    display: 'select',
    showSearch: true,
    values: allMembers,
    default: '',
    placeholder: 'none',
  };
  layerFormConfig.layer1__y2 = {
    label: 'Y2',
    section: 'Layer1',
    subSection: '(2) Axis',
    type: 'string',
    display: 'select',
    showSearch: true,
    values: allMembers,
    default: '',
    placeholder: 'none',
  };

  // layerFormConfig.layer1__scaleDomainMin = {
  //   label: 'Min',
  //   section: 'Layer1',
  //   subSection: 'Scale domain',
  //   type: 'number',
  //   display: 'text',
  //   default: null,
  //   placeholder: 'Auto',
  // };
  // layerFormConfig.layer1__scaleDomainMax = {
  //   label: 'Max',
  //   section: 'Layer1',
  //   subSection: 'Scale domain',
  //   type: 'number',
  //   display: 'text',
  //   default: null,
  //   placeholder: 'Auto',
  // };

  layerFormConfig.layer1__colorScheme = {
    label: 'Color Scheme',
    section: 'Layer1',
    subSection: 'Settings',
    type: 'string',
    display: 'select',
    showSearch: true,
    placeholder: 'Auto',
    values: [
      { Auto: '' },
      ...vegaColorSchemas,
    ],
    default: ''
  };
  layerFormConfig.layer1__unpinY = {
    label: 'Unpin Y from Zero',
    section: 'Layer1',
    subSection: 'Settings',
    type: 'string',
    display: 'select',
    showSearch: true,
    values: [
      { No: 'no' },
      { Yes: 'yes' }
    ],
    default: 'yes',
    placeholder: 'none',
  };
  // layerFormConfig.layer1__imputeMissing = {
  //   label: 'Fill Missing Values',
  //   section: 'Layer1',
  //   subSection: 'Settings',
  //   type: 'string',
  //   display: 'select',
  //   showSearch: true,
  //   default: '',
  //   placeholder: 'No',
  //   values: [{ No: '' }, { Zeros: 'zeros' }, { Mean: 'mean' }, { Median: 'median' }, { Min: 'min' }, { Max: 'max' }]
  // };

  const chartFormConfig = {};
  chartFormConfig.tooltip = {
    label: 'Enabled',
    section: 'Chart',
    subSection: 'Tooltip',
    type: 'number',
    display: 'select',
    showSearch: false,
    allowClear: false,
    default: 'yes',
    placeholder: 'no',
    values: [
      { No: 'no' },
      { Yes: 'yes' }
    ]
  };
  chartFormConfig.nearest = {
    label: 'Stick to Nearest',
    section: 'Chart',
    subSection: 'Tooltip',
    type: 'number',
    display: 'select',
    showSearch: false,
    allowClear: false,
    default: 'no',
    placeholder: 'no',
    values: [
      { No: 'no' },
      { Yes: 'yes' }
    ]
  };
  chartFormConfig.includeInTooltip = {
    label: 'Include in Tooltip',
    section: 'Chart',
    subSection: 'Tooltip',
    display: 'select',
    mode: 'multiple',
    values: allMembers,
    placeholder: 'Auto',
  };

  const dateFormat = '%y, %b %d, %a, %H:%M';

  chartFormConfig.timeUnit = {
    label: 'Time Unit',
    section: 'Chart',
    subSection: 'Tooltip',
    display: 'select',
    values: [
      { Day: dateFormat },
      { Month: '%y, %b' },
      { Week: '%y, W%V' },
      { Hours: '%y, %b %d, %H:%M' },
      { Minutes: '%y, %a, %H:%M:%S' },
      { Quarter: '%y, Q%q' },
      { 'Day of Year': '%y, D%j' },
    ],
    placeholder: 'Auto',
    default: dateFormat,
  };

  chartFormConfig.interactive = {
    label: 'Interactive',
    section: 'Chart',
    subSection: 'View',
    type: 'number',
    display: 'select',
    showSearch: false,
    allowClear: false,
    default: 'detailed',
    placeholder: 'no',
    values: [
      { No: 'no' },
      { 'Zoom (shift + wheel)': 'zoom' },
      { 'Detailed View': 'detailed' },
    ]
  };

  chartFormConfig.independentAxis = {
    label: 'Independent Axis',
    section: 'Chart',
    subSection: 'View',
    type: 'number',
    display: 'select',
    showSearch: false,
    allowClear: false,
    default: 'yes',
    placeholder: 'yes',
    values: [
      { No: 'no' },
      { Yes: 'yes' }
    ]
  };

  const { layer1__x: layer1X, layer1__y: layer1Y } = formValues;
  const xType = fieldType(layer1X, defaultX);
  const xScales = typeToScales[xType];

  const yType = fieldType(layer1Y, defaultY);
  const yScales = typeToScales[yType];

  chartFormConfig.xType = {
    label: 'X Type',
    section: 'Chart',
    subSection: 'View',
    type: 'string',
    display: 'select',
    showSearch: true,
    placeholder: 'Auto',
    default: xType,
    values: encodingTypes,
  };

  chartFormConfig.yType = {
    label: 'Y Type',
    section: 'Chart',
    subSection: 'View',
    type: 'string',
    display: 'select',
    showSearch: true,
    placeholder: 'Auto',
    default: yType,
    values: encodingTypes,
  };

  chartFormConfig.xScale = {
    label: 'X Scale',
    section: 'Chart',
    subSection: 'Scale',
    type: 'string',
    display: 'select',
    showSearch: true,
    placeholder: 'Auto',
    values: xScales
  };
  chartFormConfig.yScale = {
    label: 'Y Scale',
    section: 'Chart',
    subSection: 'Scale',
    type: 'string',
    display: 'select',
    showSearch: true,
    placeholder: 'Auto',
    values: yScales,
  };
  chartFormConfig.fixedHeight = {
    label: 'Chart Height',
    section: 'Chart',
    subSection: 'Size',
    type: 'number',
    display: 'text',
    default: null,
    placeholder: 'Auto',
  };
  chartFormConfig.fixedWidth = {
    label: 'Chart Width',
    section: 'Chart',
    subSection: 'Size',
    type: 'number',
    display: 'text',
    default: null,
    placeholder: 'Auto',
  };
  chartFormConfig.legendPosition = {
    label: 'Legend Position',
    section: 'Chart',
    subSection: 'Legend',
    type: 'string',
    display: 'select',
    default: 'bottom',
    placeholder: 'bottom',
    values: [
      { Bottom: 'bottom' },
      { Top: 'top' },
      { Left: 'left' },
      { Right: 'right' }
    ]
  };
  chartFormConfig.legendDirection = {
    label: 'Legend Direction',
    section: 'Chart',
    subSection: 'Legend',
    type: 'string',
    display: 'select',
    default: 'vertical',
    placeholder: 'vertical',
    values: [
      { Vertical: 'vertical' },
      { Horizontal: 'horizontal' },
    ]
  };
  chartFormConfig.legendColumns = {
    label: 'Legend Columns',
    section: 'Chart',
    subSection: 'Legend',
    type: 'number',
    display: 'text',
    default: '',
    placeholder: 'auto',
  };
  chartFormConfig.legendPadding = {
    label: 'Legend Padding',
    section: 'Chart',
    subSection: 'Legend',
    type: 'number',
    display: 'text',
    default: '',
    placeholder: 0,
  };

  chartFormConfig.showTitles = {
    label: 'Show Titles',
    section: 'Chart',
    subSection: 'Legend',
    type: 'number',
    display: 'select',
    showSearch: false,
    allowClear: false,
    default: 'no',
    placeholder: 'no',
    values: [
      { No: 'no' },
      { Yes: 'yes' }
    ]
  };

  return [layerFormConfig, chartFormConfig];
};
