import { useCallback } from 'react';
import { useMutation as useURQLMutation } from 'urql';

export default (mutation, options = {}) => {
  const [data, doMutation] = useURQLMutation(mutation);

  const execMutation = useCallback((input, context = {}) => {
    return doMutation(input, {
      role: options.role,
      ...context
    });
  }, [doMutation, options.role]);

  return [data, execMutation];
};
