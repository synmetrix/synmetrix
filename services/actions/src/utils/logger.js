import Cabin from "cabin";
import pino from "pino";
import signale from "signale";

const { Signale } = signale;

const loggerOptions = {
  types: {
    queueAdded: {
      badge: "**",
      color: "yellow",
      label: "Queue/Added",
      logLevel: "info",
    },
    queueMutexCreated: {
      badge: "**",
      color: "green",
      label: "Queue/Mutex/Created",
      logLevel: "info",
    },
    queueMutexExists: {
      badge: "**",
      color: "yellow",
      label: "Queue/Mutex/Exists",
      logLevel: "info",
    },
    queueMutexRemoved: {
      badge: "**",
      color: "green",
      label: "Queue/Mutex/Removed",
      logLevel: "info",
    },
  },
};

const pinoObj = pino({
  customLevels: {
    log: 30,
  },
  hooks: {
    // <https://github.com/pinojs/pino/blob/master/docs/api.md#logmethod>
    logMethod(inputArgs, method) {
      return method.call(this, {
        // <https://github.com/pinojs/pino/issues/854>
        // message: inputArgs[0],
        msg: inputArgs[0],
        meta: inputArgs[1],
      });
    },
  },
});

const env = process.env.LOGGER_ENV || "development";

const logger = new Cabin({
  key: "",
  endpoint: "",
  capture: false,
  axe: {
    logger: env === "production" ? pinoObj : new Signale(loggerOptions),
    appInfo: false,
  },
});

export default logger;
