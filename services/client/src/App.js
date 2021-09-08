import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

import { useRecoilSnapshot, RecoilRoot } from 'recoil';
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

const App = () => (
  <RecoilRoot>
    <>
      {__DEV__ && (
        <DebugObserver />
      )}
      <Routes />
    </>
  </RecoilRoot>
);

App.propTypes = {};

export default hot(App);
