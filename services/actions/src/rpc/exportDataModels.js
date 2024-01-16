import { dump } from "js-yaml";
import JSZip from "jszip";

import apiError from "../utils/apiError.js";
import { fetchGraphQL } from "../utils/graphql.js";
import createMd5Hex from "../utils/md5Hex.js";
import { putFileToBucket } from "../utils/s3.js";

const { AWS_S3_BUCKET_NAME } = process.env;

const fetchSchemasQuery = `
  query ($branch_id: uuid!) {
    branches_by_pk(id: $branch_id) {
      id
      name
      versions(limit: 1, order_by: {created_at: desc}) {
        dataschemas {
          name
          code
          checksum
        }
      }
    }
  }
`;

export default async (session, input) => {
  const { branch_id: branchId } = input;

  const userId = session?.["x-hasura-user-id"];

  try {
    const schemasResp = await fetchGraphQL(fetchSchemasQuery, {
      branch_id: branchId,
    });
    const branch = schemasResp?.data?.branches_by_pk;
    const schemas = branch?.versions?.[0]?.dataschemas || [];

    if (!branch) {
      throw new Error(`Branch ${branchId} not found!`);
    }

    const now = Date.now();

    const schemasMeta = schemas.map((schema) => ({
      [schema?.name]: {
        checksum: schema?.checksum,
      },
    }));

    const yamlObj = {
      branch: branch.name,
      createdAt: now,
      schemas: schemasMeta,
    };

    const yamlResult = dump(yamlObj, { skipInvalid: true });

    const fileList = schemas.map((schema) => ({
      filename: schema?.name,
      content: schema?.code,
    }));

    fileList.push({
      filename: "meta.yaml",
      content: yamlResult,
    });

    const zip = new JSZip();

    fileList.forEach((file) => {
      zip.file(file.filename, file.content);
    });

    const zipBuffer = await zip.generateAsync({ type: "arraybuffer" });

    const yamlMd5Hex = createMd5Hex(yamlResult);

    const filePath = `${userId}/schemas/${branch.name}/${yamlMd5Hex}.zip`;

    const { error: uploadDataError, url } = await putFileToBucket({
      bucketName: AWS_S3_BUCKET_NAME,
      fileBody: zipBuffer,
      filePath,
      fileContentType: "application/zip",
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
