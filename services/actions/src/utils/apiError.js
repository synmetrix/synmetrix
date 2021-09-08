import { fileURLToPath } from 'url';

import logger from './logger';

const __filename = fileURLToPath(import.meta.url);

export default async (err) => {
  logger.error(err);

  return {
    error: true,
    code: err.code || `${__filename}_failed`,
    message: err.message || err,
  };
};
