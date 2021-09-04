export const GRANULARITY_TO_INTERVAL = {
  day: 'DAY',
  week: 'WEEK',
  hour: 'HOUR',
  minute: 'MINUTE',
  second: 'SECOND',
  month: 'MONTH',
  quarter: 'QUARTER',
  year: 'YEAR'
};

export const timeGroupedColumn = (granularity, dimension) => {
  return `date_trunc('${GRANULARITY_TO_INTERVAL[granularity]}', ${dimension})`;
};
