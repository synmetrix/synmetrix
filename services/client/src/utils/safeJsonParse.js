import { getOr } from 'unchanged';

const safeJsonParse = (keyPath, str) => {
  let obj;

  try {
    obj = JSON.parse(getOr('{}', keyPath, str));
  } catch (e) {
    obj = getOr({}, keyPath, str);
  }

  return obj;
};

export default safeJsonParse;
