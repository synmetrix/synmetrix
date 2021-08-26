const express = require('express');

const requestReceived = require('request-received');
const responseTime = require('response-time');
const requestId = require('express-request-id');

const logger = require('./src/utils/logger');
const services = require('./src/services');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = express();

// adds request received hrtime and date symbols to request object
// (which is used by Cabin internally to add `request.timestamp` to logs
app.use(requestReceived);

// adds `X-Response-Time` header to responses
app.use(responseTime());

// adds or re-uses `X-Request-Id` header
app.use(requestId());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(logger.middleware);

const actionsMiddleware = async (req, res, next) => {
  const { input, action } = req.body;

  console.log('services');
  console.log(services);

  if (!action) {
    next();
  }

  const { name } = action;
  logger.log(`Calling action ${name}`)

  try {
    const data = await services[name](input);

    if (data.error) {
      logger.error(data);

      return res.status(400).json({
        code: String(data.statusCode),
        message: data.message,
      });
    }

    return res.json(data);
  } catch (err) {
    logger.error(err);

    res.status(500).json({
      code: '500',
      message: err.message || err,
    })
  }
};

// try to parse as the Hasura action first
app.use(actionsMiddleware);

app.listen(port);

if (dev) {
  logger.log('Development mode: ON')
}

logger.log(`Express server is running, go to http://localhost:${port}`);
