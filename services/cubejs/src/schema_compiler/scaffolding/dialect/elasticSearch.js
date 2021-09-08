export const GRANULARITY_TO_INTERVAL = {
  day: date => `DATE_TRUNC('day', ${date}::datetime)`,
  week: date => `DATE_TRUNC('week', ${date}::datetime)`,
  hour: date => `DATE_TRUNC('hour', ${date}::datetime)`,
  minute: date => `DATE_TRUNC('minute', ${date}::datetime)`,
  second: date => `DATE_TRUNC('second', ${date}::datetime)`,
  month: date => `DATE_TRUNC('month', ${date}::datetime)`,
  quarter: date => `DATE_TRUNC('quarter', ${date}::datetime)`,
  year: date => `DATE_TRUNC('year', ${date}::datetime)`
};

export const timeGroupedColumn = (granularity, dimension) => {
  return GRANULARITY_TO_INTERVAL[granularity](dimension);
};
