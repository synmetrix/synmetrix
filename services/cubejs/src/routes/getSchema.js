export const NO_SCHEMA_KEY = "no_schema";

/**
 * Asynchronous function to get the schema from the database.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} req.securityContext - The security context from the request.
 * @param {Object} res - The response object to the client.
 * @param {Object} cubejs - The Cube.js server instance.
 * @returns {Promise} - A promise that resolves to the schema of the database.
 *
 * @throws {Error} - Throws an error if getting the schema fails.
 */
export default async (req, res, cubejs) => {
  const { securityContext } = req;
  const driver = await cubejs.options.driverFactory({ securityContext });

  try {
    const schema = await driver.tablesSchema();

    if (schema?.[""]) {
      schema[NO_SCHEMA_KEY] = schema[""];
      delete schema[""];
    }

    res.json(schema);
  } catch (err) {
    console.error(err);

    if (driver.release) {
      await driver.release();
    }

    res.status(500).json({
      code: "get_schema_failed",
      message: err.message,
    });
  }
};
