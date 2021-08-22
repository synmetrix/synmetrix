import { useEffect, useMemo } from 'react';

import {
  atom,
  useRecoilState,
  selector,
} from 'recoil';

import {
  createClient,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
} from 'urql';

import { makeOperation } from '@urql/core';

import { authExchange } from '@urql/exchange-auth';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { saveAuthToken, removeAuthToken, getAuthToken } from '../utils/cookies';

export const tokenStateAtom = atom({
  key: 'tokenState',
  default: getAuthToken(),
});

export const currentUserTokenSelector = selector({
  key: 'currentUserTokenSelector',
  get: ({ get }) => get(tokenStateAtom),
  set: ({ set }, newToken) => {
    removeAuthToken();
    set(tokenStateAtom, newToken);

    if (newToken) {
      saveAuthToken(newToken);
    } else {
      saveAuthToken(null);
    }
  }
});

export const userStateAtom = atom({
  key: 'userState',
  default: null,
});

const { __DEV__ } = process.env;

export default () => {
  const [authToken, setAuthToken] = useRecoilState(currentUserTokenSelector);
  const [userState, setUserState] = useRecoilState(userStateAtom);

  useEffect(() => {
    if (!authToken) {
      setUserState(null);
    }
  }, [authToken, setUserState]);

  const client = useMemo(() => {
    const subscriptionClient = new SubscriptionClient(
      process.env.GRAPHQL_WS_URL,
      {
        reconnect: false,
        timeout: 30000,
        connectionParams: () => ({
          headers: {
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json',
          },
          lazy: false,
        }),
      },
    );

    const exchanges = [
      dedupExchange,
      authExchange({
        addAuthToOperation: ({ operation }) => {
          if (!authToken) {
            return operation;
          }

          const fetchOptions = typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

          const payload = getAuthPayload();
          const claims = payload['https://hasura.io/jwt/claims'] || {};

          // we could pass role inside operation
          const role = operation?.context?.role;
          if (role) {
            claims['x-hasura-role'] = role;
          } else {
            claims['x-hasura-role'] = 'user';
          }

          if (claims['x-hasura-role'] !== 'anonymous') {
            claims['Authorization'] = `Bearer ${authToken}`;
          }

          return makeOperation(
            operation.kind,
            operation,
            {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  ...claims,
                },
              },
            },
          );
        },
        willAuthError: ({ authState }) => {
          if (!authState) {
            return true;
          }

          return false;
        },
        didAuthError: ({ error }) => error?.graphQLErrors?.some((e) => e.extensions?.code === 'FORBIDDEN'),
        getAuth: () => {
          if (!authToken) {
            return {};
          }

          return authToken;
        },
      }),
      fetchExchange,
      subscriptionExchange({
        forwardSubscription: (operation) => subscriptionClient.request(operation),
      }),
    ];

    if (__DEV__) {
      const { devtoolsExchange } = require('@urql/devtools');
      exchanges.unshift(devtoolsExchange);
    }

    return createClient({
      url: process.env.GRAPHQL_SERVER_URL,
      exchanges,
    });
  }, [authToken]);

  return {
    client,
    authToken,
    setAuthToken,
    userState,
    setUserState,
  };
};
