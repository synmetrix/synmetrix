export const GRANULARITY_TO_INTERVAL = {
  day: 'day',
  week: 'week',
  hour: 'hour',
  minute: 'minute',
  second: 'second',
  month: 'month',
  quarter: 'quarter',
  year: 'year'
};

export const timeGroupedColumn = (granularity, dimension) => {
  return `date_trunc('${GRANULARITY_TO_INTERVAL[granularity]}', ${dimension})`;
};
