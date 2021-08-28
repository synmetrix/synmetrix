const { AUTH_PREFIX } = process.env;

export default () => {
  const withAuthPrefix = (path) => {
    let prefix = '';
    if (AUTH_PREFIX) {
      prefix = AUTH_PREFIX;
    }

    return `${prefix}${path}`;
  };

  return {
    withAuthPrefix,
  };
};
