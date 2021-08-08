import generate from 'nanoid/generate';
import dateFns from 'date-fns';

const { format } = dateFns;

const currentDate = () => format(new Date(), 'YYYYMMDD-HHmm');
const currentTime = () => format(new Date(), 'HHmm');

const gen = entropy => generate('1234567890abcdefghijklmnopqrstuvwxyz', entropy);
const createName = (postfix, entropy = 4) => [currentDate(), gen(entropy), postfix].filter(Boolean).join('-').toLowerCase();

const hashCode = str => {
  let hash = 0;

  if (!str.length) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
};

export { hashCode, gen, createName, currentDate, currentTime };
