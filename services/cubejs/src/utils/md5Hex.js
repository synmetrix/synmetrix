const crypto = require('crypto');

const createMd5Hex = (obj) => {
  const source = JSON.stringify(obj);
  const hex = crypto.createHash('md5').update(source).digest("hex");

  return hex;
};

module.exports = createMd5Hex;
