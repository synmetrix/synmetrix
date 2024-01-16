import apiError from "../utils/apiError.js";
import { fetchGraphQL } from "../utils/graphql.js";

const createEventsMutation = `
  mutation ($objects: [events_insert_input!]!) {
    insert_events(objects: $objects) {
      affected_rows
    }
  }
`;

const createEvents = async (input) => {
  const res = await fetchGraphQL(createEventsMutation, input);
  return res?.data?.insert_events;
};

export default (_, input) => {
  try {
    return createEvents(input);
  } catch (err) {
    return apiError(err);
  }
};
