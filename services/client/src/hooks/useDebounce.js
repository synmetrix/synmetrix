import { useRef, useCallback, useEffect } from 'react';

const useDebounce = (callback, delay) => {
  const functionTimeoutHandler = useRef(null);
  const isComponentUnmounted = useRef(false);

  const debouncedFunction = useRef(callback);
  debouncedFunction.current = callback;

  const cancelDebouncedCallback = useCallback(() => {
    clearTimeout(functionTimeoutHandler.current);
    functionTimeoutHandler.current = null;
  }, []);

  useEffect(
    () => () => { isComponentUnmounted.current = true; },
    []
  );

  const debouncedCallback = useCallback(
    (...args) => {
      clearTimeout(functionTimeoutHandler.current);

      functionTimeoutHandler.current = setTimeout(() => {
        cancelDebouncedCallback();

        if (!isComponentUnmounted.current) {
          debouncedFunction.current(...args);
        }
      }, delay);
    },
    [delay, cancelDebouncedCallback]
  );

  return [debouncedCallback, cancelDebouncedCallback];
}

export default useDebounce;
