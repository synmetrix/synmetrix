import {
  atom,
  useRecoilState,
  selector,
} from 'recoil';

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

export default () => {
  const [authToken, setAuthToken] = useRecoilState(currentUserTokenSelector);

  return {
    authToken,
    setAuthToken,
  };
};
