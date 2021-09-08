import crypto from 'crypto';

const createMd5Hex = (obj) => {
  const source = JSON.stringify(obj);
  const hex = crypto.createHash('md5').update(source).digest("hex");

  return hex;
};

export default createMd5Hex;
