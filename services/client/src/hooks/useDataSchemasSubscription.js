import { useSubscription } from 'urql';
import useDebounce from 'hooks/useDebounce';
import { useEffect } from 'react';

const newDataSchemasSubscription = `
  subscription {
    dataschemaUpdated {
      dataschema {
        rowId
      }
    }
  }
`;

const handleSubscription = (messages = [], response) => [response, ...(messages || [])];

export default (cb = () => {}) => {
  const [res] = useSubscription({ query: newDataSchemasSubscription }, handleSubscription);

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
