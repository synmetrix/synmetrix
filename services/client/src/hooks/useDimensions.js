import { useRef } from 'react';
import { useSize } from 'ahooks';

const useDimensions = (dom = null) => {
  const ref = useRef();
  const size = useSize(dom || ref);

  return [dom || ref, size];
};

export default useDimensions;
