import { atom, selector } from 'recoil';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

import { 
  saveAuthToken,
  removeAuthToken,
  getAuthToken,

  saveRefreshToken,
  removeRefreshToken,
  getRefreshToken,

  saveCurrentUser,
  removeCurrentUser,
  getCurrentUser 
} from '../utils/storage';

export const currentUserAtom = atom({
  key: 'currentUserAtom',
  default: getCurrentUser(),
});

export const currentTokenAtom = atom({
  key: 'currentTokenAtom',
  default: getAuthToken(),
});

export const currentRefreshTokenAtom = atom({
  key: 'currentRefreshTokenAtom',
  default: getRefreshToken(),
});

export const currentRefreshToken = selector({
  key: 'currentRefreshToken',
  get: ({ get }) => get(currentRefreshTokenAtom),
  set: ({ set }, newToken) => {
    removeRefreshToken();
    set(currentRefreshTokenAtom, newToken);

    if (newToken) {
      saveRefreshToken(newToken);
    } else {
      set(currentRefreshTokenAtom, null);
    }
  }
});

export const currentUserSelector = selector({
  key: 'currentUserSelector',
  get: ({ get }) => get(currentUserAtom),
  set: ({ set }, newData) => {
    removeCurrentUser();

    if (newData) {
      saveCurrentUser(newData);
      set(currentUserAtom, newData);
    } else {
      set(currentUserAtom, {});
    }
  }
});

export const currentToken = selector({
  key: 'currentToken',
  get: ({ get }) => get(currentTokenAtom),
  set: ({ set }, newToken) => {
    removeAuthToken();
    set(currentTokenAtom, newToken);

    if (newToken) {
      saveAuthToken(newToken);
    } else {
      set(currentUserSelector, {});
    }
  }
});

export const jwtPayload = selector({
  key: 'jwtPayload',
  get: ({ get }) => {
    const token = get(currentToken);

    if (!token) {
      return null;
    }

    const auth = { Authorization: `Bearer ${token}` };
    let payload = {

    };

    try {
      payload = jwtDecode(token);

      if (dayjs().isAfter((payload.exp * 1000))) {
        console.error('JWT is expired');
        return null;
      }
    } catch (err) {
      console.error('JWT is broken, reload the application data');
    }

    const { hasura = {} } = payload;

    return {
      ...auth,
      ...hasura
    };
  }
});

if (module.hot) {
  module.hot.dispose(function() {
    console.log('dispose')
    // module is about to be replaced
  })

  module.hot.accept(function() {
    console.log('accept')
    // module or one of its dependencies was just updated
  })
}
