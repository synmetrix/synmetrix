/* eslint-disable react/no-children-prop */
import React from 'react';

import {
  Provider as URQLProvider,
} from 'urql';

import * as reactRouterDom from 'react-router-dom';

import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { ThirdPartyEmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui';

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
import Docs from './pages/Docs';
import ErrorFound from './components/ErrorFound';

const {
  BrowserRouter: Router,
  Switch,
  Route,
  Redirect,
} = reactRouterDom;

const Routes = () => {
  const client = useGraphQLClient();
  const { withAuthPrefix } = useAppSettings();

  return (
    <URQLProvider value={client}>
      <Router>
        <Switch>
          <Route path='/callback' component={Callback} />
          <Route path='/link_login' component={MagicLinkLogin} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/404' component={ErrorFound} />

          { getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyEmailPasswordPreBuiltUI]) }

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

                        <Route path={withAuthPrefix('/docs/:versionId')} component={Docs} />
                        <Route path={withAuthPrefix('/profile')} component={Profile} />
                        <Route path={withAuthPrefix('/schemas/:rest*')} component={DataSchemas} />
                        <Route path={withAuthPrefix('/dashboards/:rowId?')} component={Dashboards} />
                        <Route path={withAuthPrefix('/charts/:rowId?')} component={Charts} />

                        <Route path='/403' component={() => <ErrorFound status={403} />} />
                      </Switch>
                    </Layout>
                  </Router>
                </>
              );
            }}
          />
          <Redirect to='/auth' />
        </Switch>
      </Router>
    </URQLProvider>
  );
};

Routes.propTypes = {};

export default Routes;
