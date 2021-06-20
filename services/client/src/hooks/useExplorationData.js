import { useMemo } from 'react';

import { getOr } from 'unchanged';

export default ({ exploration }) => {
  return useMemo(() => {
    const rows = getOr([], 'data', exploration.dataCube);
    const hitLimit = getOr(false, 'hitLimit', exploration.dataCube);
    const skippedMembers = getOr([], 'annotation.skippedMembers', exploration.dataCube);

    return {
      rows,
      hitLimit,
      skippedMembers,
    };
  },
    [exploration.dataCube]
  );
};
