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

export const userStateAtom = atom({
  key: 'userState',
  default: null,
});

export default () => {
  const [authToken, setAuthToken] = useRecoilState(currentUserTokenSelector);
  const [userState, setUserState] = useRecoilState(userStateAtom);

  return {
    authToken,
    setAuthToken,
    userState,
    setUserState,
  };
};
