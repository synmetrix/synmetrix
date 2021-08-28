import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { Layout, Avatar } from 'antd';

import cx from 'classnames';

import logoImage from 'assets/images/logo.svg';
import logoBlackImage from 'assets/images/logo-black.svg';

import useAuthToken from 'hooks/useAuthToken';
import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';
import useCurrentUserState from 'hooks/useCurrentUserState';

import useSider from 'hooks/useSider';
import usePermissions from 'hooks/usePermissions';
import useCurrentUser from 'hooks/useCurrentUser';

import MenuView from 'components/MenuView';

import s from './Layout.module.css';

const { Header, Content, Footer, Sider } = Layout;

const UserMenu = ({ mode, restrictScopes = [] }) => {
  const { doLogout } = useAuthToken();
  const { t } = useTranslation();
  const { withAuthPrefix } = useAppSettings();

  const accountSubMenu = [
    {
      path: withAuthPrefix('/profile'),
      title: t('Profile'),
    }
  ];

  if (!restrictScopes.includes('team')) {
    accountSubMenu.push({
      path: withAuthPrefix('/team'),
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
    currentUserState: currentUser,
  } = useCurrentUserState();

  const { withAuthPrefix } = useAppSettings();

  const dataSources = currentUser?.datasources || [];
  const dashboards = currentUser?.dashboards || [];
  const dashboardsCount = dashboards?.length || 0;

  const dataSourceItems = dataSources.map(source => ({
    key: source.id,
    path: withAuthPrefix(`/schemas/${source.id}`),
    title: source.name,
  }));

  const dashboardItems = dashboards.map(dashboard => ({
    key: dashboard.id,
    path: withAuthPrefix(`/dashboards/${dashboard.id}`),
    title: dashboard.name,
  }));

  const lastUsedDataSourceId = null;

  const lastDataSource = dataSources.find(source => source.id == lastUsedDataSourceId);
  const dataSourceId = lastDataSource?.id || dataSources?.[0]?.id || '';

  let routes = [
    {
      path: withAuthPrefix(`/explore/${dataSourceId}`),
      title: t('Explore'),
      scope: 'explore/header'
    },
    {
      path: withAuthPrefix('/sources'),
      title: t('Data Sources'),
      scope: 'datasources'
    },
    {
      path: withAuthPrefix('/schemas'),
      title: t('Data Schemas'),
      children: dataSourceItems,
      scope: 'dataschemas'
    },
  ];

  if (dashboardsCount) {
    routes.unshift({
      path: withAuthPrefix('/dashboards'),
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
  const [location] = useLocation();
  const { authToken } = useAuthToken();

  useEffect(() =>{
    if (!authToken) {
      window.location.href = '/login';
    }
  }, [authToken, location.pathname]);

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
