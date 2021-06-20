import { useState, useEffect } from 'react';
import { getOr } from 'unchanged';

const getIndices = (text, find) => {
  const regex = new RegExp(find, 'ig');

  const res = [];
  text.replace(regex, (match, index) => {
    res.push([index, index + match.length - 1]);
  });

  return res;
}

const search = (items, searchKey, searchTerm) => {
  if (!searchTerm) {
    return items;
  }

  const result = [];

  items.forEach(item => {
    const matchedLines = {};

    const value = getOr('', searchKey, item);
    value.split('\n').forEach((line, index) => {
      const indices = searchTerm && getIndices(line, searchTerm);

      if (indices.length) {
        matchedLines[Number(index + 1)] = { line, indices };
      }
    });

    result.push({
      ...item,
      matchedLines,
    });
  });

  return result;
};

export default (items, searchKey, searchTerm = '') => {
  const [term, setTerm] = useState(searchTerm);
  const [matchedItems, setItems] = useState([]);

  useEffect(
    () => {
      const updateState = () => {
        const filteredItems = search(items, searchKey, term).filter(v =>
          Object.keys(v.matchedLines || {}).length
        );

        setItems(filteredItems);
      };

      const timer = setTimeout(updateState, 300);
      return () => clearTimeout(timer);
    },
    [items, searchKey, term]
  );

  return {
    term,
    matchedItems,
    setTerm,
  };
};
