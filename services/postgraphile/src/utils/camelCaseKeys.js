import humps from 'humps';

const camelizeKeys = (obj) => Object.keys(obj).reduce((memo, key) => {
  memo[humps.camelize(key)] = obj[key];
  return memo;
}, {});

const decamelizeKeys = (obj) => Object.keys(obj).reduce((memo, key) => {
  memo[humps.decamelize(key)] = obj[key];
  return memo;
}, {});

export { camelizeKeys, decamelizeKeys };
