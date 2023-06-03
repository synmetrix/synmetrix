/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React, { useEffect } from 'react';

import { useRecoilSnapshot, RecoilRoot } from 'recoil';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import ThirdPartyEmailPassword, { Github, Google } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Session from 'supertokens-auth-react/recipe/session';

import Routes from './Routes';

const DebugObserver = () => {
  const snapshot = useRecoilSnapshot();

  useEffect(() => {
    console.debug('The following atoms were modified:');

    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
};

const { __DEV__ } = process.env;

SuperTokens.init({
  appInfo: {
    appName: 'MLCraft',
    apiDomain: 'http://localhost:4444',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/auth',
    websiteBasePath: '/auth'
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      getRedirectionURL: async (context) => {
        if (context.action === 'SUCCESS') {
          if (context.redirectToPath !== undefined) {
            return context.redirectToPath;
          }
          return '/~/sources';
        }
        return undefined;
      },
      signInAndUpFeature: {
        // providers: [
        //   Github.init(),
        //   Google.init(),
        // ]
      }
    }),
    Session.init()
  ]
});

const App = () => (
  <RecoilRoot>
    <>
      {__DEV__ && (
        <DebugObserver />
      )}
      <SuperTokensWrapper>
        <Routes />
      </SuperTokensWrapper>
    </>
  </RecoilRoot>
);

App.propTypes = {};

export default App;
