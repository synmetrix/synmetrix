export const GRANULARITY_TO_INTERVAL = {
  day: (date) => `DATE_FORMAT(${date}, '%Y-%m-%dT00:00:00.000')`,
  week: (date) => `DATE_FORMAT(date_add('1900-01-01', interval TIMESTAMPDIFF(WEEK, '1900-01-01', ${date}) WEEK), '%Y-%m-%dT00:00:00.000')`,
  hour: (date) => `DATE_FORMAT(${date}, '%Y-%m-%dT%H:00:00.000')`,
  minute: (date) => `DATE_FORMAT(${date}, '%Y-%m-%dT%H:%i:00.000')`,
  second: (date) => `DATE_FORMAT(${date}, '%Y-%m-%dT%H:%i:%S.000')`,
  month: (date) => `DATE_FORMAT(${date}, '%Y-%m-01T00:00:00.000')`,
  year: (date) => `DATE_FORMAT(${date}, '%Y-01-01T00:00:00.000')`
};

export const timeGroupedColumn = (granularity, dimension) => {
  return `CAST(${GRANULARITY_TO_INTERVAL[granularity](dimension)} AS DATETIME)`;
};
