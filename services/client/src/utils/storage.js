export const saveAuthToken = (token) => {
  if (!token) {
    return;
  }

  try {
    localStorage.setItem('token', token);
  } catch (err) {
    console.error(err);
  }
};

export const getAuthToken = () => localStorage.getItem('token');

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const saveRefreshToken = (token) => {
  if (!token) {
    return;
  }

  try {
    localStorage.setItem('refresh-token', token);
  } catch (err) {
    console.error(err);
  }
};

export const getRefreshToken = () => localStorage.getItem('refresh-token');

export const removeRefreshToken = () => {
  localStorage.removeItem('refresh-token');
};
