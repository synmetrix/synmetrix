import produce from "immer";

import apiError from "../utils/apiError.js";
import { fetchGraphQL } from "../utils/graphql.js";
import generateUserAccessToken from "../utils/jwt.js";
import {
  divider,
  header,
  text,
  unorderedList,
} from "../utils/markdownHelpers.js";

const versionQuery = `
  query ($id: uuid!) {
    versions_by_pk(id: $id) {
      id
      dataschemas {
        name
        user {
          display_name
        }
      }
      user {
        id
        display_name
      }
      created_at
      branch {
        id
        name
        status
        datasource_id
        versions (where: { id: { _neq: $id } }, order_by: { created_at: desc }) {
          user {
            display_name
          }
          created_at
        }
      }
    }
  }
`;

const datasourceMetaQuery = `
  query ($datasourceId: uuid!, $branchId: uuid) {
    fetch_meta(datasource_id: $datasourceId, branch_id: $branchId) {
      cubes
    }
  }
`;

const setMarkdownDocMutation = `
  mutation SetMarkdownDocMutation ($id: uuid!, $markdownDoc: String) {
    update_versions_by_pk(
      pk_columns: { id: $id }
      _set: {
        markdown_doc: $markdownDoc
      }
    ) {
      id
    }
  }
`;

const getMemberFieldsMapper = (source) => (param) => {
  const entry = Object.entries(param)[0];

  if (!entry) {
    return null;
  }

  const [key, title] = entry;

  if (!source[key]) {
    return null;
  }

  if (Array.isArray(source[key])) {
    return `${text(title, {
      bold: true,
      indent: 2,
      postNewLine: false,
    })}: \`${source[key].join(", ")}\``;
  }

  return `${text(title, { bold: true, indent: 2, postNewLine: false })}: \`${
    source[key]
  }\``;
};

const generateMemberDoc = (member) => {
  const { meta } = member;

  let result = header(member.shortTitle, { size: 5, bold: true, indent: 8 });
  result += text(member.description || "No description provided", {
    indent: 8,
  });
  result += text("Parameters:", { bold: true, indent: 8 });

  const parameters = [
    { name: "Name" },
    { title: "Title" },
    { type: "Type" },
    { aggType: "Aggregation Type" },
    { format: "Format" },
    { drillMembers: "Drill Members" },
    { sql: "SQL" },
  ];

  const fields = parameters.map(getMemberFieldsMapper(member)).filter(Boolean);

  result += unorderedList(fields);

  if (meta) {
    const metaParameters = Object.entries(meta).map(([key]) => ({
      [key]: key,
    }));
    const metaFields = metaParameters
      .map(getMemberFieldsMapper(meta))
      .filter(Boolean);

    result += text("Metadata:", { bold: true, indent: 8 });
    result += unorderedList(metaFields);
  }

  return result;
};

const generateDataschemaDoc = (dataschema) => {
  let doc = `<details open>\n`;
  doc += `<summary>${dataschema.name}</summary>\n\n`;

  if (dataschema.title && dataschema.title !== dataschema.name) {
    doc += header(dataschema.title, { size: 4, indent: 4 });
  }
  if (dataschema.description) {
    doc += text(dataschema.description, { indent: 4 });
  }

  if (dataschema?.measures?.length > 0) {
    doc += header("Measures", { size: 4, indent: 4 });

    doc += dataschema.measures.map(generateMemberDoc).join("\n");
    doc += `\n`;
  }

  if (dataschema?.dimensions?.length > 0) {
    doc += header("Dimensions", { size: 4, indent: 4 });
    doc += dataschema.dimensions.map(generateMemberDoc).join("\n");
    doc += `\n`;
  }

  if (dataschema?.segments?.length > 0) {
    doc += header("Segments", { size: 4, indent: 4 });
    doc += dataschema?.segments?.map(generateMemberDoc).join("\n");
    doc += `\n`;
  }

  doc += `</details>\n`;

  return doc;
};

const generateVersionDoc = async ({ version }) => {
  const { id: versionId, user, dataschemas, branch } = version;
  const { id: userId, display_name: versionAuthorName } = user;
  const { name: branchName, datasource_id: datasourceId, id: branchId } = branch;
  const dataschemasCollaborators = dataschemas.map(
    (ds) => ds.user.display_name
  );

  const authToken = await generateUserAccessToken(userId);
  const metaResp = await fetchGraphQL(datasourceMetaQuery, { datasourceId, branchId  }, authToken);

  let doc = header("Documentation", { size: 1 });

  doc += `This documentation covers version ${versionId} from branch "${branchName}".\n\n`;
  doc += divider;
  doc += header("List of cubes:", { size: 4 });

  const dataschemasDocs = dataschemas.map((dataschema) => {
    const meta =
      metaResp?.data?.fetch_meta?.cubes?.find(
        (cube) => cube.name === dataschema.name.replace(/(.js|.yml)$/i, "")
      ) || {};
    const dataschemaDoc = generateDataschemaDoc({ ...dataschema, ...meta });

    return dataschemaDoc;
  });

  doc += `${dataschemasDocs.join("\n")}\n`;
  doc += divider;

  doc += header(`Version author: ${versionAuthorName}`, { size: 4 });

  if (dataschemasCollaborators > 1) {
    doc += header(`Collaborators:`, { size: 4 });
    doc += unorderedList(dataschemasCollaborators);
  }

  return doc;
};

export default async (session, input) => {
  const payload = input?.event?.data?.new;
  const { id } = payload;

  let markdownDoc = "";
  let result = { error: false, markdownDoc };

  const versionResp = await fetchGraphQL(versionQuery, { id });
  const version = versionResp?.data?.versions_by_pk;

  if (!version) {
    return apiError("Version not found");
  }

  try {
    markdownDoc = await generateVersionDoc({ version });
  } catch (err) {
    return apiError(err);
  }

  await fetchGraphQL(setMarkdownDocMutation, { id, markdownDoc });

  result = produce(result, (draft) => {
    draft.markdownDoc = markdownDoc;
  });

  return result;
};
