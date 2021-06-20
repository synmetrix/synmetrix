import generate from 'nanoid/generate';

const genName = entropy => generate('1234567890abcdefghijklmnopqrstuvwxyz', entropy);

export default genName;
