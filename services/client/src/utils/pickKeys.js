import { get } from 'unchanged';

export default (keysArr, curState, arrNotation = false) =>
  keysArr.reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: get(arrNotation && [cur] || cur, curState),
    }),
    {}
  );
