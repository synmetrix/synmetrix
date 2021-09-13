export const GRANULARITY_TO_INTERVAL = {
  day: 'DAY',
  week: 'WEEK(MONDAY)',
  hour: 'HOUR',
  minute: 'MINUTE',
  second: 'SECOND',
  month: 'MONTH',
  quarter: 'QUARTER',
  year: 'YEAR'
};

export const timeGroupedColumn = (granularity, dimension) => {
  return GRANULARITY_TO_INTERVAL[granularity](dimension);
};
