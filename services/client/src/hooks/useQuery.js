import { useCallback } from 'react';
import { useQuery as useURQLQuery } from 'urql';

export default (query, options = {}) => {
  const [data, doQueryData] = useURQLQuery(query);

  const execQueryData = useCallback((context) => {
    return doQueryData({
      requestPolicy: options.requestPolicy,
      role: options.role,
      ...context
    });
  }, [doQueryData, options.requestPolicy, options.role]);

  return [data, execQueryData];
};
