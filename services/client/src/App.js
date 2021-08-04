import React, { useEffect } from 'react';

import { Router, Route, Switch, Redirect, useRouter } from 'wouter';
import useLocation from 'wouter/use-location';

import { hot } from 'react-hot-loader/root';

import {
  Provider as URQLProvider,
  createClient,
  dedupExchange, fetchExchange,
  subscriptionExchange
} from 'urql';

import { cacheExchange } from '@urql/exchange-graphcache';

import { SubscriptionClient } from 'subscriptions-transport-ws';

import useAuth from './hooks/useAuth';
import useAuthToken from './hooks/useAuthToken';

import Layout from './components/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DataSources from './pages/DataSources';
import DataSchemas from './pages/DataSchemas';
import CallbackPage from './pages/Callback';
import Explore from './pages/Explore';
import Dashboards from './pages/Dashboards';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Charts from './pages/Charts';
import ErrorFound from './components/ErrorFound';

const { __DEV__ } = process.env;

const useCheckAuth = () => {
  const [path, navigate] = useLocation();
  const router = useRouter();

  const { currentUser } = useAuth({ checkMe: true });

  router.currentUser = currentUser;
  router.lastTransition = { path };

  if (!currentUser?.userId) {
    return ['/login', navigate];
  }

  return [path, navigate];
};

const App = () => {
  const { authToken: token } = useAuthToken();

  const getAuthHeader = () => {
    const auth = token ? { Authorization: `Bearer ${token}` } : {};

    return auth;
  };

  const apiWsUrl = window.GRAPHQL_WS_URL || process.env.GRAPHQL_WS_URL;

  const subscriptionClient = new SubscriptionClient(
    apiWsUrl,
    {
      reconnect: true,
      timeout: 30000,
      connectionParams: () => getAuthHeader()
    }
  );

  const cacheExchangeConfig = {
    keys: {
      User: data => data.userId || data.rowId,
      SqlQuery: () => null,
      DataCube: () => null,
      ACLPayload: () => null,
      Datasource: () => null,
      Annotation: () => null,
      Dashboard: () => null,
      Exploration: () => null,
      PinnedItem: () => null,
    },
  };

  const exchanges = [
    dedupExchange, cacheExchange(cacheExchangeConfig), fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => {
        return subscriptionClient.request({
          ...operation,
        });
      }
    }),
  ];

  if (__DEV__) {
    const { devtoolsExchange } = require('@urql/devtools');
    exchanges.unshift(devtoolsExchange);
  }

  const apiUrl = window.GRAPHQL_SERVER_URL || process.env.GRAPHQL_SERVER_URL;

  const client = createClient({
    url: apiUrl,
    fetchOptions: () => {
      return {
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
          ...getAuthHeader(),
        },
      };
    },
    exchanges,
  });

  return (
    <URQLProvider value={client}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/callback" component={CallbackPage} />

          <Route path="/d/:rest*">
            <Router hook={useCheckAuth}>
              <Layout>
                <Switch>
                  <Route path="/d/explore/:rest*" component={Explore} />

                  <Route path="/d/sources/new/:dbType?" component={DataSources} />
                  <Route path="/d/sources/upload/:format?" component={DataSources} />
                  <Route path="/d/sources/:editId?/upload/:format?" component={DataSources} />
                  <Route path="/d/sources/:rowId?" component={DataSources} />

                  <Route path="/d/team/invite" component={Team} />
                  <Route path="/d/team/settings" component={Team} />
                  <Route path="/d/team" component={Team} />

                  <Route path="/d/profile" component={Profile} />
                  <Route path="/d/schemas/:rest*" component={DataSchemas} />
                  <Route path="/d/dashboards/:rowId?" component={Dashboards} />
                  <Route path="/d/charts/:rowId?" component={Charts} />
                </Switch>
              </Layout>
            </Router>
          </Route>

          <Route path="/404" component={ErrorFound} />
          <Route path="/:rest*"><Redirect to="/login" /></Route>
        </Switch>
      </Router>
    </URQLProvider>
  );
};

App.propTypes = {};

export default hot(App);
