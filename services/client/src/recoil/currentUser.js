import { atom, selector } from 'recoil';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

import { saveAuthToken, removeAuthToken, getAuthToken } from '../utils/storage';

export const currentUserAtom = atom({
  key: 'currentUserAtom',
  default: {},
});

export const currentTokenAtom = atom({
  key: 'currentTokenAtom',
  default: getAuthToken(),
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
    const payload = jwtDecode(token);

    if (dayjs().isAfter((payload.exp * 1000))) {
      console.error('JWT is expired');
      return null;
    }

    const { hasura } = payload;

    return {
      ...auth,
      ...hasura
    };
  }
});
