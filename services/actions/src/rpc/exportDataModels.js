import JSZip from 'jszip';
import { dump } from 'js-yaml';
import { set } from 'unchanged';

import createMd5Hex from '../utils/md5Hex';
import { putFileToBucket } from '../utils/s3';
import { fetchGraphQL } from '../utils/graphql';
import apiError from '../utils/apiError';

const {
  AWS_S3_BUCKET_NAME,
} = process.env;

const fetchSchemasQuery = `
  query ($where: dataschemas_bool_exp) {
    dataschemas(where: $where) {
      name
      code
      branch
      checksum
    }
  }
`;

const getListVariables = (params) => {
  const res = {
    where: {
      user: {
        id: {
          _eq: params.userId
        },
      },
      branch: {
        _eq: params.branch,
      },
    },
  };

  if (params?.teamId) {
    res = set('where.datasource.team_id._eq', params.teamId, res);
  }

  return res;
}

export default async (session, input) => {
  const branch = input?.branch || 'main';
  const { teamId } = input;

  const userId = session?.['x-hasura-user-id'];

  try {
    const schemasResp = await fetchGraphQL(fetchSchemasQuery, getListVariables({ teamId, userId, branch }));
    const schemas = schemasResp?.data?.dataschemas || [];

    const now = Date.now();
    
    const schemasMeta = schemas.map(schema => ({
      [schema?.name]: {
        checksum: schema?.checksum,
      },
    }));

    const yamlObj = {
      branch,
      createdAt: now,
      schemas: schemasMeta,
    }

    const yamlResult = dump(yamlObj, { skipInvalid: true });

    const fileList = schemas.map(schema => ({
      filename: schema?.name,
      content: schema?.code,
    }));

    fileList.push({
      filename: 'meta.yaml',
      content: yamlResult,
    });

    const zip = new JSZip();

    fileList.forEach(file => {
      zip.file(file.filename, file.content);
    });

    const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' });

    const yamlMd5Hex = createMd5Hex(yamlResult);

    const filePath = `${teamId || userId}/schemas/${branch}/${yamlMd5Hex}.zip`;

    const { error: uploadDataError, url } = await putFileToBucket({
      bucketName: AWS_S3_BUCKET_NAME,
      fileBody: zipBuffer,
      filePath,
      fileContentType: 'application/zip',
    });

    if (uploadDataError) {
      return apiError(uploadDataError);
    }

    return {
      download_url: url,
    };
  } catch (err) {
    return apiError(err);
  }
};
