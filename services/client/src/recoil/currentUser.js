import { atom, selector } from 'recoil';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

import { 
  saveAuthToken,
  removeAuthToken,
  getAuthToken,

  saveRefreshToken,
  removeRefreshToken,
  getRefreshToken 
} from '../utils/storage';

export const currentUserAtom = atom({
  key: 'currentUserAtom',
  default: {},
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

export const currentToken = selector({
  key: 'currentToken',
  get: ({ get }) => get(currentTokenAtom),
  set: ({ set }, newToken) => {
    removeAuthToken();
    set(currentTokenAtom, newToken);

    if (newToken) {
      saveAuthToken(newToken);
    } else {
      set(currentUserAtom, {});
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
    let payload = {};

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
