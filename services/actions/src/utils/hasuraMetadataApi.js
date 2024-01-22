import fetch from "node-fetch";

const HASURA_METADATA_ENDPOINT = process.env.HASURA_METADATA_ENDPOINT;
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

export const fetchMetadataAPI = async (params) => {
  const headers = {
    "x-hasura-admin-secret": HASURA_GRAPHQL_ADMIN_SECRET,
    "x-hasura-role": "admin",
  };

  const result = await fetch(HASURA_METADATA_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(params),
    headers,
  });

  return parseResponse(result);
};
