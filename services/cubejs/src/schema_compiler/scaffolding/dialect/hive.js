export const GRANULARITY_TO_INTERVAL = {
  day: (date) => `DATE_FORMAT(${date}, 'yyyy-MM-dd 00:00:00.000')`,
  week: (date) => `DATE_FORMAT(from_unixtime(unix_timestamp('1900-01-01 00:00:00') + floor((unix_timestamp(${date}) - unix_timestamp('1900-01-01 00:00:00')) / (60 * 60 * 24 * 7)) * (60 * 60 * 24 * 7)), 'yyyy-MM-dd 00:00:00.000')`,
  hour: (date) => `DATE_FORMAT(${date}, 'yyyy-MM-dd HH:00:00.000')`,
  minute: (date) => `DATE_FORMAT(${date}, 'yyyy-MM-dd HH:mm:00.000')`,
  second: (date) => `DATE_FORMAT(${date}, 'yyyy-MM-dd HH:mm:ss.000')`,
  month: (date) => `DATE_FORMAT(${date}, 'yyyy-MM-01 00:00:00.000')`,
  year: (date) => `DATE_FORMAT(${date}, 'yyyy-01-01 00:00:00.000')`
};

export const timeGroupedColumn = (granularity, dimension) => {
  return GRANULARITY_TO_INTERVAL[granularity](dimension);
};
