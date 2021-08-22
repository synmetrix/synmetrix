import React from 'react';
import { hot } from 'react-hot-loader/root';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {
  Provider as URQLProvider,
} from 'urql';

import useAuthToken from './hooks/useAuthToken';

import Layout from './components/Layout';

import Login from './pages/Login';
import SignUp from './pages/SignUp';

import DataSources from './pages/DataSources';
import DataSchemas from './pages/DataSchemas';
import Explore from './pages/Explore';
import Dashboards from './pages/Dashboards';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Charts from './pages/Charts';
import ErrorFound from './components/ErrorFound';

const App = () => {
  const { client } = useAuthToken();

  return (
    <URQLProvider value={client}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/404" component={ErrorFound} />

          <Route
            path="/d/:rest*"
            children={() => {
              return (
                <>
                  <Router>
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

                        <Route path="/403" component={() => <ErrorFound status={403} />} />
                      </Switch>
                    </Layout>
                  </Router>
                </>
              );
            }}
          />
        </Switch>
      </Router>
    </URQLProvider>
  );
};

App.propTypes = {};

export default hot(App);
