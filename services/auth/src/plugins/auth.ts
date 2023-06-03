import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import formDataPlugin from "@fastify/formbody";
import fastifyPlugin from "fastify-plugin";

import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session/index.js";
import EmailPassword from "supertokens-node/recipe/emailpassword/index.js";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword/index.js";
import {
  plugin,
  errorHandler,
} from "supertokens-node/framework/fastify/index.js";
import { BaseRequest, BaseResponse } from "supertokens-node/lib/build/framework/index.js";
import { SessionContainerInterface } from "supertokens-node/lib/build/recipe/session/types.js";
import { getAccountByExternalIdQuery } from "../api/Account.js";

// import { accountQuery } from "../api/Account.js";

const { Google, Github } = ThirdPartyEmailPassword;

async function auth(app: FastifyInstance) {
  const providers = [];
  const {
    SUPERTOKENS_CONNECTION_URI,
    SUPERTOKENS_API_DOMAIN,
    SUPERTOKENS_FRONTEND_DOMAIN,
    SUPERTOKENS_GOOGLE_CLIENT_ID,
    SUPERTOKENS_GOOGLE_CLIENT_SECRET,
    SUPERTOKENS_GITHUB_CLIENT_ID,
    SUPERTOKENS_GITHUB_CLIENT_SECRET,
    CORS_ORIGIN_URL
  } = app.config;

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
    framework: "fastify",
    supertokens: {
      connectionURI: SUPERTOKENS_CONNECTION_URI,
    },
    appInfo: {
      apiDomain: SUPERTOKENS_API_DOMAIN,
      appName: 'MLCraft',
      websiteDomain: SUPERTOKENS_FRONTEND_DOMAIN,
      apiBasePath: '/auth',
      websiteBasePath: '/auth'
    },
    recipeList: [
      ThirdPartyEmailPassword.init({ providers }),
      EmailPassword.init(),
      Session.init({
        exposeAccessTokenToFrontendInCookieBasedAuth: true,
        override: {
          functions: function (originalImplementation) {
            return {
              ...originalImplementation,
              async createNewSession(input: { req: BaseRequest; res: BaseResponse; userId: string; accessTokenPayload?: any; sessionData?: any; userContext: any }): Promise<SessionContainerInterface> {
                const { userId } = input;
                const accountResponse: any = await app.hasura.request(getAccountByExternalIdQuery, { externalId: userId });

                const { user_id: accountUserId } = accountResponse?.accounts?.[0] || {};

                input.accessTokenPayload = {
                  ...input.accessTokenPayload,
                  "https://hasura.io/jwt/claims": {
                    "x-hasura-user-id": accountUserId,
                    "x-hasura-default-role": "user",
                    "x-hasura-allowed-roles": ["user"],
                  }
                };

                return originalImplementation.createNewSession(input);
              },
            };
          }
        },
      })
    ],
  });

  app.register(cors, {
    origin: CORS_ORIGIN_URL,
    allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  });

  app.register(formDataPlugin);
  app.register(plugin);

  app.setErrorHandler(errorHandler());
}

export default fastifyPlugin(auth);
