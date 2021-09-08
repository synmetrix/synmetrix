import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default () => {
  const location = useLocation();
  const history = useHistory();

  const setLocation = useCallback(
    (newPath) => {
      history.push(newPath);
    },
    [history],
  );

  return [
    location,
    setLocation,
  ];
};
