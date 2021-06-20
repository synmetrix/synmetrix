const lowerCaseKeys = (obj) => Object.keys(obj).reduce((memo, key) => {
  memo[key.toLowerCase()] = obj[key];
  return memo;
}, {});

export default lowerCaseKeys;
