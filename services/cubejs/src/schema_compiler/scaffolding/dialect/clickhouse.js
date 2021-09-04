export const GRANULARITY_TO_INTERVAL = {
  day: 'Day',
  hour: 'Hour',
  minute: 'Minute',
  second: 'Second',
  month: 'Month',
  quarter: 'Quarter',
  year: 'Year',
};

export const timeGroupedColumn = (granularity, dimension, timezone = 'UTC') => {
  if (granularity === 'week') {
    return `toDateTime(toMonday(${dimension}, '${timezone}'), '${timezone}')`;
  } else {
    const interval = GRANULARITY_TO_INTERVAL[granularity];
    return `toDateTime(${granularity === 'second' ? 'toDateTime' : `toStartOf${interval}`}(${dimension}, '${timezone}'), '${timezone}')`;
  }
};
