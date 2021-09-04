export const GRANULARITY_VALUE = {
  day: 'DD',
  week: 'IW',
  hour: 'HH24',
  minute: 'mm',
  second: 'ss',
  month: 'MM',
  year: 'YYYY'
};

export const timeGroupedColumn = (granularity, dimension) => {
  if (!granularity) {
    return dimension;
  }

  return `TRUNC(${dimension}, '${GRANULARITY_VALUE[granularity]}')`;
};
