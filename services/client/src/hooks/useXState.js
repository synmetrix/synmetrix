import { useState, useCallback } from 'react';

export default (initialState) => {
  const [state, setState] = useState(initialState);

  const updateState = useCallback(
    (newState) => setState((prev) => ({ ...prev, ...newState })),
    []
  );

  return [
    state,
    updateState,
    setState
  ];
};
