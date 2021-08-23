import { atom, selector } from 'recoil';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

import { saveAuthToken, removeAuthToken, getAuthToken } from '../utils/storage';

export const currentUser = atom({
  key: 'currentUser',
  default: null,
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
      set(currentUser, null);
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

    if (dayjs().isAfter(payload.exp)) {
      return null;
    }

    const { hasura } = payload;

    return {
      ...auth,
      ...hasura
    };
  }
});
