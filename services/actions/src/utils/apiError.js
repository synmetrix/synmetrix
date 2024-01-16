import { fileURLToPath } from "url";

import logger from "./logger.js";

const __filename = fileURLToPath(import.meta.url);

const toString = (err) => {
  if (Array.isArray(err)) {
    return err.join(", ").toString();
  }

  return err.toString();
};

export default async (err) => {
  logger.error(err);

  return {
    error: true,
    code: err.code || `${__filename}_failed`,
    message: toString(err.message || err),
  };
};
