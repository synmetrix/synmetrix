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

export const getAuthToken = () => localStorage.getItem('token')

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};
