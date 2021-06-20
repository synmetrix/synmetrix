// copied from ramda because lazy to fix
const slice = (fromIndex, toIndex, list) => Array.prototype.slice.call(list, fromIndex, toIndex);

export default (n, xs) => slice(0, n < 0 ? Infinity : n, xs);
