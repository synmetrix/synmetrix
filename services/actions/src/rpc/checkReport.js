import sendExplorationScreenshot from "./sendExplorationScreenshot.js";

import apiError from "../utils/apiError.js";
import { fetchGraphQL } from "../utils/graphql.js";

const reportQuery = `
  query ($id: uuid!) {
    reports_by_pk(id: $id) {
      id
      name
      delivery_type
      delivery_config
      exploration {
        id
        datasource_id
        user_id
        playground_state
      }
    }
  }
`;

export default async (_, input) => {
  const { id } = input?.payload || {};

  const queryResult = await fetchGraphQL(reportQuery, { id });
  const report = queryResult?.data?.reports_by_pk || {};

  const {
    name,
    exploration,
    delivery_type: deliveryType,
    delivery_config: deliveryConfig,
  } = report;

  if (!exploration) {
    return apiError("Exploration not found");
  }

  try {
    const { error } = await sendExplorationScreenshot({
      deliveryType,
      deliveryConfig,
      exploration,
      name: `Report ${name}`,
    });

    if (error) {
      return apiError(error);
    }
  } catch (e) {
    return apiError(e);
  }

  return { error: false, result: { fired: true } };
};
