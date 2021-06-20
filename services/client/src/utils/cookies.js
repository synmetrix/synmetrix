import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const saveAuthToken = (token) => {
  if (!token) {
    return;
  }

  try {
    const jwtPayload = jwtDecode(token);
    const expires = new Date(jwtPayload.exp * 1000);

    Cookies.set('token', token, { path: '/', expires });
  } catch (err) {
    console.error(err);
  }
};

export const getAuthToken = () => Cookies.get('token', { path: '/' })

export const getAuthPayload = () => {
  const token = getAuthToken();
  let jwtPayload = {};

  try {
    jwtPayload = jwtDecode(token);
  } catch (err) {
    console.error(err);
  }

  return jwtPayload;
};

export const removeAuthToken = () => {
  Cookies.remove('token', { path: '/' });
};

export default Cookies;
