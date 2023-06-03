import express from 'express';

import requestReceived from 'request-received';
import responseTime from 'response-time';
import requestId from 'express-request-id';
import supertokens from "supertokens-node";
import { middleware, errorHandler } from 'supertokens-node/framework/express';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import Session from 'supertokens-node/recipe/session';

import logger from './src/utils/logger';
import hyphensToCamelCase from './src/utils/hyphensToCamelCase';

const { Google, Github } = ThirdPartyEmailPassword;

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = express();

const {
  SUPERTOKENS_API_DOMAIN,
  SUPERTOKENS_FRONTEND_DOMAIN,
  SUPERTOKENS_GOOGLE_CLIENT_ID,
  SUPERTOKENS_GOOGLE_CLIENT_SECRET,
  SUPERTOKENS_GITHUB_CLIENT_ID,
  SUPERTOKENS_GITHUB_CLIENT_SECRET,
  SUPERTOKENS_CONNECTION_URI
} = process.env;

const providers = [];

if (SUPERTOKENS_GOOGLE_CLIENT_ID && SUPERTOKENS_GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: SUPERTOKENS_GOOGLE_CLIENT_ID,
      clientSecret: SUPERTOKENS_GOOGLE_CLIENT_SECRET
    })
  );
};

if (SUPERTOKENS_GITHUB_CLIENT_ID && SUPERTOKENS_GITHUB_CLIENT_SECRET) {
  providers.push(
    Github({
      clientId: SUPERTOKENS_GITHUB_CLIENT_ID,
      clientSecret: SUPERTOKENS_GITHUB_CLIENT_SECRET
    })
  );
};

supertokens.init({
  supertokens: {
    connectionURI: SUPERTOKENS_CONNECTION_URI,
  },
  appInfo: {
    apiDomain: SUPERTOKENS_API_DOMAIN,
    appName: 'MLCraft',
    websiteDomain: SUPERTOKENS_FRONTEND_DOMAIN,
    apiBasePath: '/auth',
    websiteBasePath: '/'
  },
  recipeList: [
    Session.init(),
    ThirdPartyEmailPassword.init({
      providers
    }),
  ]
});

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

app.get('/healthz', (req, res) => {
  return res.status(200).json({
    code: 'ok',
  });
});

app.use(middleware());

app.post('/rpc/:method', async (req, res) => {
  const { method } = req.params;

  const { 
    session_variables: session,
    input
  } = req.body;

  const requestInput = input ?? req.body;

  const modulePath = `./src/rpc/${hyphensToCamelCase(method)}`;
  const module = await import(modulePath);

  if (!module) {
    return res.status(404).json({
      code: 'method_not_found',
      message: `Module "${modulePath}" not found. Check the server logs`,
    });
  }

  const data = await module.default(session, requestInput, req.headers);

  if (data) {
    if (data.error) {
      return res.status(400).json(data);
    }

    return res.json(data);
  }

  return res.status(400).json({
    code: 'method_has_no_output',
    message: `No output from the method "${method}". Check the script`,
  });
});

app.use(errorHandler());

app.listen(port);

if (dev) {
  logger.log('Development mode: ON')
  logger.log(`Express server is running, go to http://localhost:${port}`);
}
