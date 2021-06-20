export const isObject = x => Object(x) === x || Array.isArray(x);
// it goes by nested object and saves all keys (with dots)
const keyify = (obj, prefix = []) => 
  Object.keys(obj || {}).reduce((res, el) => {
    if (isObject(obj[el])) {
      return [
        ...res,
        [...prefix, el],
        ...keyify(obj[el], [...prefix, el]),
      ];
    }

    return [...res, [...prefix, el]];
  }, []);

export default keyify;
