import { useSubscription } from 'urql';
import useDebounce from 'hooks/useDebounce';
import { useEffect } from 'react';

const newDashboardSubscription = `
  subscription {
    dashboardUpdated {
      dashboard {
        rowId
      }
    }
  }
`;

const handleSubscription = (messages = [], response) => [response, ...(messages || [])];

export default (cb = () => {}) => {
  const [res] = useSubscription({ query: newDashboardSubscription }, handleSubscription);

  const [debouncedCb] = useDebounce(resCb => {
    if (cb) {
      cb(resCb);
    };
  },
  500
  );

  useEffect(() => {
    if (res.data) {
      debouncedCb(res.data);
    }
  }, [debouncedCb, res.data]);
};
