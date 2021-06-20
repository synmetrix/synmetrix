const normalizeExt = (str, ext = '.js') => {
  let filename = str;

  if (str.includes(ext)) {
    [filename] = str.split('.');
  }

   return `${filename.charAt(0).toUpperCase() + filename.slice(1)}${ext}`;
};

 export { normalizeExt };
