import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { Layout, Avatar } from 'antd';

import cx from 'classnames';

import logoImage from 'assets/images/logo.svg';
import logoBlackImage from 'assets/images/logo-black.svg';

import useCurrentUserState from 'hooks/useCurrentUserState';
import useAuthToken from 'hooks/useAuthToken';

// import useDataSourcesSubscription from 'hooks/useDataSourcesSubscription';
// import useDashboardsSubscription from 'hooks/useDashboardsSubscription';
import useSider from 'hooks/useSider';
import usePermissions from 'hooks/usePermissions';
import useCurrentUser from 'hooks/useCurrentUser';

import MenuView from 'components/MenuView';

import s from './Layout.module.css';

const { Header, Content, Footer, Sider } = Layout;

const UserMenu = ({ mode, restrictScopes = [] }) => {
  const { doLogout } = useAuthToken();
  const { t } = useTranslation();

  const accountSubMenu = [
    {
      path: '/d/profile',
      title: t('Profile'),
    }
  ];

  if (!restrictScopes.includes('team')) {
    accountSubMenu.push({
      path: '/d/team',
      title: t('Team'),
    });
  }

  accountSubMenu.push({
    onClick: doLogout,
    title: t('Logout'),
  });

  const routes = [
    {
      title: t('Account'),
      children: accountSubMenu,
    }
  ];

  return (
    <MenuView
      mode={mode}
      className={s.header}
      style={{ lineHeight: '64px' }}
      nodes={routes}
    />
  );
};

const MainMenu = (props) => {
  const { mode, restrictScopes } = props;
  const { t } = useTranslation();

  const {
    currentUser,
  } = useCurrentUser();

  console.log('currentUser');
  console.log(currentUser);
  const dataSources = currentUser?.datasources || [];
  const dashboards = currentUser?.dashboards || [];
  const dashboardsCount = dashboards?.length || 0;

  // useDataSourcesSubscription(() => {
  //   execCurrentUserQuery({ requestPolicy: 'network-only' });
  // });
  //
  // useDashboardsSubscription(() => {
  //   execCurrentUserQuery({ requestPolicy: 'network-only' });
  // });

  const dataSourceItems = dataSources.map(source => ({
    key: source.id,
    path: `/d/schemas/${source.id}`,
    title: source.name,
  }));

  const dashboardItems = dashboards.map(dashboard => ({
    key: dashboard.id,
    path: `/d/dashboards/${dashboard.id}`,
    title: dashboard.name,
  }));

  const lastUsedDataSourceId = null;

  const lastDataSource = dataSources.find(source => source.id == lastUsedDataSourceId);
  const dataSourceId = lastDataSource?.id || dataSources?.[0]?.id || '';

  let routes = [
    {
      path: `/d/explore/${dataSourceId}`,
      title: t('Explore'),
      scope: 'explore/header'
    },
    {
      path: '/d/sources',
      title: t('Data Sources'),
      scope: 'datasources'
    },
    {
      path: '/d/schemas',
      title: t('Data Schemas'),
      children: dataSourceItems,
      scope: 'dataschemas'
    },
  ];

  if (dashboardsCount) {
    routes.unshift({
      path: `/d/dashboards`,
      title: t('Dashboards'),
      children: dashboardItems,
      scope: 'dashboards'
    });
  }

  routes = routes.filter(route => !restrictScopes?.includes(route.scope));

  return (
    <>
      <div
        className={cx(
          s.logo,
          { [s.verticalLogo]: mode && mode === 'vertical' }
        )}
      >
        <img
          alt=''
          style={{
            height: 45,
            paddingRight: 20
          }}
          src={logoImage}
        />
        <span style={{ paddingRight: 15 }}>MLCraft</span>
      </div>
      <MenuView
        mode={mode}
        className={s.header}
        style={{ lineHeight: '64px' }}
        nodes={routes.filter(Boolean)}
      />
    </>
  );
};

const MainLayout = (props) => {
  const { children } = props;
  const { state, onBreakpoint, onCollapse } = useSider();

  useCurrentUser();
  const { restrictScopes } = usePermissions({});

  return (
    <Layout>
      <Sider
        className={s.sider}
        breakpoint="md"
        collapsedWidth={0}
        onBreakpoint={onBreakpoint}
        onCollapse={onCollapse}
        collapsed={state.siderCollapsed}
      >
        <MainMenu
          mode="vertical"
          restrictScopes={restrictScopes}
        />
        <UserMenu
          mode="vertical"
          restrictScopes={restrictScopes}
        />
      </Sider>
      <Layout style={{ minHeight: 'auto' }}>
        <Header
          className={cx(
            s.header,
            { [s.hidden]: state.brokenPoint },
          )}
        >
          <div style={{ float: 'left' }}>
            <MainMenu restrictScopes={restrictScopes} />
          </div>
          <div style={{ float: 'right' }}>
            <UserMenu restrictScopes={restrictScopes} />
          </div>
        </Header>
        <Content style={{ minHeight: 'auto', zIndex: 1 }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Avatar src={logoBlackImage} size={20} />
        </Footer>
      </Layout>
    </Layout>
  );
};

MainLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default MainLayout;
