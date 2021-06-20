import { useCallback } from 'react';
import { assign } from 'unchanged';

import { useQuery } from 'urql';
import useXState from 'hooks/useXState';
import useDeepCompareEffect from 'hooks/useDeepCompareEffect';

export default ({ 
  query,
  variables = {},
  requestPolicy = 'cache-and-network',
}) => {
  const [argsState, updateArgs, setArgs] = useXState({
    query,
    variables,
    requestPolicy,
    pause: true,
  });

  useDeepCompareEffect(
    () => {
      updateArgs({ variables });
    },
    [updateArgs, variables]
  );

  const [queryData, execQuery] = useQuery(argsState);

  const reExecQuery = useCallback((newArgs = {}) => {
    if (newArgs && Object.keys(newArgs).length) {
      setArgs(prevArgs => {

        return {
          ...prevArgs,
          ...newArgs,
          variables: assign(null, prevArgs.variables, newArgs.variables),
        };
      });

      return null;
    }

    execQuery();
    return null;
  }, [execQuery, setArgs]);

  useDeepCompareEffect(
    () => {
      const checkVars = argsState.variables && Object.values(argsState.variables).filter(v => Boolean(v)).length;

      if (checkVars) {
        execQuery();
      }
    },
    [execQuery, argsState.variables]
  );

  return {
    argsState,
    updateArgs,
    queryData,
    execQuery,
    reExecQuery,
  };
};
