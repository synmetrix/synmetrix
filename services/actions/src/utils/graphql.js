import fetch from "node-fetch";

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

export const parseResponse = async (res) => {
  let data = await res.text();

  try {
    data = JSON.parse(data);
  } catch (err) {
    // do nothing
  }

  if (res.status < 200 || res.status >= 400) {
    return Promise.reject(data);
  }

  if (data?.errors) {
    return Promise.reject(data.errors.map((err) => err.message));
  }

  return data;
};

export const fetchGraphQL = async (query, variables, authToken) => {
  const headers = {};

  if (authToken) {
    const token =
      authToken.substring(0, 6) === "Bearer"
        ? authToken
        : `Bearer ${authToken}`;
    headers.authorization = token;
  } else {
    headers["x-hasura-admin-secret"] = HASURA_GRAPHQL_ADMIN_SECRET;
  }

  const result = await fetch(HASURA_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
    headers,
  });

  return parseResponse(result);
};
