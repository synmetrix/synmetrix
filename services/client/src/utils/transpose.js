export default (outerlist) => {
  let i = 0;
  const result = [];

  while (i < outerlist.length) {
    const innerlist = outerlist[i];
    let j = 0;

    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }
      result[j].push(innerlist[j]);
      j += 1;
    }
    i += 1;
  }

  return result;
};
