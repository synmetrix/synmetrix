import unchanged from "unchanged";

const { get } = unchanged;

export default (keysArr, curState) =>
  keysArr.reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: get(cur, curState),
    }),
    {}
  );
