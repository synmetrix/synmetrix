export const GRANULARITY_TO_INTERVAL = {
  day: (date) => `DATE_FORMAT(${date}, 'yyyy-MM-dd 00:00:00.000')`,
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  week: (date) => { throw new Error('Week is unsupported'); }, // TODO
  hour: (date) => `DATE_FORMAT(${date}, 'yyyy-MM-dd HH:00:00.000')`,
  minute: (date) => `DATE_FORMAT(${date}, 'yyyy-MM-dd HH:mm:00.000')`,
  second: (date) => `DATE_FORMAT(${date}, 'yyyy-MM-dd HH:mm:ss.000')`,
  month: (date) => `DATE_FORMAT(${date}, 'yyyy-MM-01 00:00:00.000')`,
  year: (date) => `DATE_FORMAT(${date}, 'yyyy-01-01 00:00:00.000')`
};

export const timeGroupedColumn = (granularity, dimension) => {
  return GRANULARITY_TO_INTERVAL[granularity](dimension);
};
