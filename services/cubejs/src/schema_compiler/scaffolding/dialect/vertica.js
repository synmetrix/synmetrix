export const GRANULARITY_TO_INTERVAL = {
  day: 'DD',
  week: 'W',
  hour: 'HH24',
  minute: 'mm',
  second: 'ss',
  month: 'MM',
  quarter: 'Q',
  year: 'YY'
};

export const timeGroupedColumn = (granularity, dimension) => {
  return `TRUNC(${dimension}, '${GRANULARITY_TO_INTERVAL[granularity]}')`;
};
