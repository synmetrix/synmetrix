import React, { useMemo } from 'react';
import { getOr } from 'unchanged';

import useAuthContext from './useAuthContext';

import ErrorFound from '../components/ErrorFound';

const usePermissions = ({ scope = '' }) => {
  let fallback = null;

  const currentUser = useAuthContext();
  const cachedRestrictScopes = (localStorage.getItem('restrictScopes') || '').split(',');
  const restrictScopes = useMemo(() => getOr(cachedRestrictScopes, 'ACL.restrictScopes', currentUser), [currentUser, cachedRestrictScopes]);

  if (restrictScopes.includes(scope)) {
    fallback = (<ErrorFound status={403} />);
  }

  const saveCachedRestrictScopes = (scopes = []) => localStorage.setItem('restrictScopes', scopes.join(','));

  return {
    fallback,
    restrictScopes,
    saveCachedRestrictScopes
  };
};

export default usePermissions;
