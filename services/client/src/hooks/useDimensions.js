import { useState, useCallback, useLayoutEffect } from 'react';

const MOBILE_SIZE_BR = 667;

const getDimensionObject = (node) => {
  const rect = node.getBoundingClientRect();

  let viewPoint;
  if (window.innerWidth <= MOBILE_SIZE_BR) {
    viewPoint = 'sm';
  }

  return {
    width: rect.width || 'auto',
    height: rect.height || 'auto',
    top: 'x' in rect ? rect.x : rect.top,
    left: 'y' in rect ? rect.y : rect.left,
    x: 'x' in rect ? rect.x : rect.left,
    y: 'y' in rect ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom,
    viewPoint,
  };
};

const useDimensions = ({ liveMeasure = true }) => {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback(elem => {
    setNode(elem);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      if (!liveMeasure) {
        return false;
      }

      return node && window.requestAnimationFrame(() =>
        setDimensions(getDimensionObject(node))
      );
    };

    measure();

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure);

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  },
  [liveMeasure, node]
  );

  return [ref, dimensions, node];
};

export default useDimensions;
