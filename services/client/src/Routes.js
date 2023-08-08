/* eslint-disable react/no-children-prop */
import React from 'react';

import {
  Provider as URQLProvider,
} from 'urql';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import useGraphQLClient from './hooks/useGraphQLClient';
import useAppSettings from './hooks/useAppSettings';

import Layout from './components/Layout';

import Login from './pages/Login';
import MagicLinkLogin from './pages/MagicLinkLogin';
import SignUp from './pages/SignUp';
import Callback from './pages/Callback';

import DataSources from './pages/DataSources';
import DataSchemas from './pages/DataSchemas';
import Explore from './pages/Explore';
import Dashboards from './pages/Dashboards';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Charts from './pages/Charts';
import Reports from './pages/Reports';
import Alerts from './pages/Alerts';
import Logs from './pages/Logs';
import Docs from './pages/Docs';
import Roles from './pages/Roles';
import ErrorFound from './components/ErrorFound';

const Routes = () => {
  const client = useGraphQLClient();
  const { withAuthPrefix } = useAppSettings();

  return (
    <URQLProvider value={client}>
      <Router>
        <Switch>
          <Route path="/callback" component={Callback} />
          <Route path="/link_login" component={MagicLinkLogin} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/404" component={ErrorFound} />

          <Route
            path={withAuthPrefix('/:rest*')}
            children={() => {
              return (
                <>
                  <Router>
                    <Layout>
                      <Switch>
                        <Route path={withAuthPrefix('/explore/:rest*')} component={Explore} />

                        <Route path={withAuthPrefix('/sources/new/:dbType?')} component={DataSources} />
                        <Route path={withAuthPrefix('/sources/sql-interface')} component={DataSources} />
                        <Route path={withAuthPrefix('/sources/upload/:format?')} component={DataSources} />
                        <Route path={withAuthPrefix('/sources/:editId?/upload/:format?')} component={DataSources} />
                        <Route path={withAuthPrefix('/sources/:rowId?')} component={DataSources} />

                        <Route path={withAuthPrefix('/team/new')} component={Team} />
                        <Route path={withAuthPrefix('/team/invite')} component={Team} />
                        <Route path={withAuthPrefix('/team/settings')} component={Team} />
                        <Route path={withAuthPrefix('/team')} component={Team} />

                        <Route path={withAuthPrefix('/reports/new/:deliveryType?')} component={Reports} />
                        <Route path={withAuthPrefix('/reports/:editId')} component={Reports} />
                        <Route path={withAuthPrefix('/reports')} component={Reports} />

                        <Route path={withAuthPrefix('/alerts/new/:deliveryType?')} component={Alerts} />
                        <Route path={withAuthPrefix('/alerts/:editId')} component={Alerts} />
                        <Route path={withAuthPrefix('/alerts')} component={Alerts} />

                        <Route path={withAuthPrefix('/logs/preaggregations/:datasourceId?/:preAggregation?')} component={Logs} />
                        <Route path={withAuthPrefix('/logs/preaggregations')} component={Logs} />
                        <Route path={withAuthPrefix('/logs/requests/:rowId')} component={Logs} />
                        <Route path={withAuthPrefix('/logs/requests')} component={Logs} />
                        <Route path={withAuthPrefix('/logs')} component={Logs} />

                        <Route path={withAuthPrefix('/docs/:versionId')} component={Docs} />
                        <Route path={withAuthPrefix('/profile')} component={Profile} />
                        <Route path={withAuthPrefix('/schemas/:rest*')} component={DataSchemas} />
                        <Route path={withAuthPrefix('/dashboards/:rowId?')} component={Dashboards} />
                        <Route path={withAuthPrefix('/charts/:rowId?')} component={Charts} />

                        <Route path={withAuthPrefix('/roles/new')} component={Roles} />
                        <Route path={withAuthPrefix('/roles/:editId?')} component={Roles} />
                        <Route path={withAuthPrefix('/roles')} component={Roles} />

                        <Route path="/403" component={() => <ErrorFound status={403} />} />
                      </Switch>
                    </Layout>
                  </Router>
                </>
              );
            }}
          />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </URQLProvider>
  );
};

Routes.propTypes = {};

export default Routes;
