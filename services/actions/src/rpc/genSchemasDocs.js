import produce from 'immer';

import apiError from '../utils/apiError';
import { fetchGraphQL } from '../utils/graphql';
import { header, unorderedList, divider, text } from '../utils/markdownHelpers';

const versionQuery = `
  query ($id: uuid!) {
    versions_by_pk(id: $id) {
      dataschemas {
        name
        user {
          display_name
        }
      }
      user {
        display_name
      }
      created_at
      branch {
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
  query ($datasourceId: uuid!) {
    fetch_meta(datasource_id: $datasourceId) {
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

const generateMemberDoc = member => {
  let memberWithMeta = { ...member, ...member.meta };

  let result = header(member.shortTitle, { size: 5, bold: true, indent: 8 });
  result += text(member.description || 'No description provided', { indent: 8 });
  result += text('Parameters:', { bold: true, indent: 8 });

  const parameters = [
    { name: 'Name' },
    { title: 'Title' },
    { type: 'Type' },
    { aggType: 'Aggregation Type' },
    { format: 'Format' },
    { drillMembers: 'Drill Members' },
    { sql: 'SQL' },
    ...Object.entries(member.meta || {}).map(metaEntry => ({ [metaEntry[0]]: metaEntry[0] })),
  ];

  const fields = parameters.map(param => {
    const entry = Object.entries(param)[0];

    if (!entry) {
      return null;
    }

    const [key, title] = entry;

    if (!memberWithMeta[key]) {
      return null;
    }

    if (Array.isArray(memberWithMeta[key])) {
      return `${text(title, { bold: true, indent: 2, postNewLine: false })}: \`${memberWithMeta[key].join(', ')}\``;
    }

    return `${text(title, { bold: true, indent: 2, postNewLine: false })}: \`${memberWithMeta[key]}\``;
  }).filter(Boolean);

  result += unorderedList(fields);

  return result;
};

const generateDataschemaDoc = (dataschema) => {
  let doc = `<details>\n`;
  doc += `<summary>${dataschema.name}</summary>\n\n`;

  console.log(dataschema);

  if (dataschema?.measures?.length > 0) {
    doc += header('Measures', { size: 4, indent: 4 });

    doc += dataschema.measures.map(generateMemberDoc).join('\n');
    doc += `\n`;
  }

  if (dataschema?.dimensions?.length > 0) {
    doc += header('Dimensions', { size: 4, indent: 4 });
    doc += dataschema.dimensions.map(generateMemberDoc).join('\n');
    doc += `\n`;
  }

  if (dataschema?.segments?.length > 0) {
    doc += header('Segments', { size: 4, indent: 4 });
    doc += dataschema?.segments?.map(generateMemberDoc).join('\n');
    doc += `\n`;
  }

  doc += `</details>\n`;

  return doc;
};

const generateVersionDoc = async ({ version }) => {
  const { user, dataschemas, branch } = version;
  const { display_name: versionAuthorName } = user;
  const { name: branchName, datasource_id: datasourceId } = branch;
  const dataschemasCollaborators = dataschemas.map(ds => ds.user.display_name);

  const metaResp = await fetchGraphQL(datasourceMetaQuery, { datasourceId });

  console.log('metaResp', metaResp);

  let doc = header('Documentation', { size: 1 });

  doc += `This documentation covers branch "${branchName}" and the latest version of dataschemas.\n\n`;
  doc += divider;
  doc += header('List of cubes:', { size: 4 });

  const dataschemasDocs = dataschemas.map(dataschema => {
    const meta = metaResp?.data?.fetch_meta?.cubes?.find(cube => cube.name === dataschema.name.replace('.js', '')) || {};
    const dataschemaDoc = generateDataschemaDoc({ ...dataschema, ...meta });

    return dataschemaDoc;
  });

  doc += `${dataschemasDocs.join('\n')}\n`;
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

  let markdownDoc = '';
  let result = { error: false, markdownDoc };

  const versionResp = await fetchGraphQL(versionQuery, { id });
  const version = versionResp?.data?.versions_by_pk;

  if (!version) {
    return apiError('Version not found');
  }

  try {
    markdownDoc = await generateVersionDoc({ version });
  } catch (err) {
    return apiError(err);
  }

  await fetchGraphQL(setMarkdownDocMutation, { id, markdownDoc });

  result = produce(result, draft => {
    draft.markdownDoc = markdownDoc
  });

  return result;
};
