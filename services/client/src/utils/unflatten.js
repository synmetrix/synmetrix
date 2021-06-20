const unflatten =  (array, parent, nodeKey = 'path', parentKey = 'parentPath', nodeChildKey = 'children') => {
  const node = { ...parent } || {};

  const children = array.filter(child => node && child[parentKey] === node[nodeKey]);

  if (children.length) {
    node[nodeChildKey] = children.map(child => unflatten(array, child, nodeKey, parentKey, nodeChildKey));
  }

  return node;
};

export default unflatten;
