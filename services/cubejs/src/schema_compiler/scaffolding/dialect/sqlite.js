export const GRANULARITY_TO_INTERVAL = {
  day: (date) => `strftime('%Y-%m-%dT00:00:00.000', ${date})`,
  week: (date) => `strftime('%Y-%m-%dT00:00:00.000', CASE WHEN date(${date}, 'weekday 1') = date(${date}) THEN date(${date}, 'weekday 1') ELSE date(${date}, 'weekday 1', '-7 days') END)`,
  hour: (date) => `strftime('%Y-%m-%dT%H:00:00.000', ${date})`,
  minute: (date) => `strftime('%Y-%m-%dT%H:%M:00.000', ${date})`,
  second: (date) => `strftime('%Y-%m-%dT%H:%M:%S.000', ${date})`,
  month: (date) => `strftime('%Y-%m-01T00:00:00.000', ${date})`,
  year: (date) => `strftime('%Y-01-01T00:00:00.000', ${date})`
};

export const timeGroupedColumn = (granularity, dimension) => {
  return GRANULARITY_TO_INTERVAL[granularity](dimension);
};
