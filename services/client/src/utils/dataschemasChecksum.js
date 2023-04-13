import md5 from 'md5';

export default function dataschemasChecksum(dataschemas) {
  let checksum = dataschemas.reduce((acc, cur) => acc + cur.code, '');
  checksum = md5(checksum);

  return checksum;
};
