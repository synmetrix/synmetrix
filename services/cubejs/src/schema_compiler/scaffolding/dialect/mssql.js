import MSSqlDriver from '@cubejs-backend/mssql-driver';

export const MSSQL_DEFAULT_PORT = 1433;

export const GRANULARITY_TO_INTERVAL = {
  day: (date) => `dateadd(day, DATEDIFF(day, 0, ${date}), 0)`,
  week: (date) => `dateadd(week, DATEDIFF(week, 0, ${date}), 0)`,
  hour: (date) => `dateadd(hour, DATEDIFF(hour, 0, ${date}), 0)`,
  minute: (date) => `dateadd(minute, DATEDIFF(minute, 0, ${date}), 0)`,
  second: (date) => `CAST(FORMAT(${date}, 'yyyy-MM-ddTHH:mm:ss.000') AS DATETIME2)`, // until SQL 2016, this causes an int overflow; in SQL 2016 these calls can be changed to DATEDIFF_BIG
  month: (date) => `dateadd(month, DATEDIFF(month, 0, ${date}), 0)`,
  quarter: (date) => `dateadd(quarter, DATEDIFF(quarter, 0, ${date}), 0)`,
  year: (date) => `dateadd(year, DATEDIFF(year, 0, ${date}), 0)`,
};

export const timeGroupedColumn = (granularity, dimension) => {
  return GRANULARITY_TO_INTERVAL[granularity](dimension);
};
