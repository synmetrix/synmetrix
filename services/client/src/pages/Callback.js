import React, { useEffect, useState } from 'react';
import queryString from 'query-string';

import useAuth from '../hooks/useAuth';
import useAuthToken from '../hooks/useAuthToken';

const Callback = () => {
  const [message, setMessage] = useState();
  const { doAuth } = useAuthToken();
  const { refresh } = useAuth();

  useEffect(() => {
    (async () => {
      if (refresh.data || refresh.loading) {
        return;
      }

      const { refresh_token: refreshToken } = queryString.parse(window.location.search);

      const res = await refresh.run({ refreshToken });

      if (res.statusCode && res.statusCode !== 200) {
        setMessage(res.message);
      } else {
        setMessage(null);
        doAuth(res.jwt_token, res.refresh_token);
      }
    })();
  }, [refresh, doAuth]);

  return message ? <div style={{ textAlign: 'center', color: 'red' }}>{message}</div> : null;
};

export default Callback;
