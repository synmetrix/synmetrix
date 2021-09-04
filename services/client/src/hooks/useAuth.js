import { useRequest } from 'ahooks';
import {
  useRecoilValue,
} from 'recoil';

import { currentRefreshToken, currentToken } from '../recoil/currentUser';

const { GRAPHQL_PLUS_SERVER_URL } = process.env;

export default () => {
  const refreshToken = useRecoilValue(currentRefreshToken);
  const authToken = useRecoilValue(currentToken);

  const login = useRequest(async (values) => {
    const response = await fetch(`${GRAPHQL_PLUS_SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        cookie: false,
      }),
    });

    return response.json();
  }, {
    manual: true,
  });

  const register = useRequest(async (values) => {
    const response = await fetch(`${GRAPHQL_PLUS_SERVER_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        cookie: false,
      }),
    });

    return response.json();
  }, {
    manual: true,
  });

  const validateResponse = async response => {
    let data = {};

    try {
      data = await response.json();
    } catch (err) {
      if (response.status === 204) {
        console.log('HTTP status: ', response.status);
        return {
          statusCode: response.status,
        };
      }

      return err;
    }

    return data;
  };

  const logout = useRequest(async (values) => {
    const response = await fetch(`${GRAPHQL_PLUS_SERVER_URL}/auth/logout?refresh_token=${refreshToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(values),
    });

    return validateResponse(response);
  }, {
    manual: true,
  });

  const refresh = useRequest(async (values) => {
    const response = await fetch(`${GRAPHQL_PLUS_SERVER_URL}/auth/token/refresh?refresh_token=${values?.refreshToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return validateResponse(response);
  }, {
    manual: true,
  });

  const revoke = useRequest(async (values) => {
    const response = await fetch(`${GRAPHQL_PLUS_SERVER_URL}/auth/token/revoke?refresh_token=${refreshToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(values),
    });

    return validateResponse(response);
  }, {
    manual: true,
  });

  const changePass = useRequest(async (values) => {
    const response = await fetch(`${GRAPHQL_PLUS_SERVER_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(values),
    });

    return validateResponse(response);
  }, {
    manual: true,
  });

  return {
    refreshToken,
    changePass,
    login,
    register,
    logout,
    revoke,
    refresh,
  };
};
