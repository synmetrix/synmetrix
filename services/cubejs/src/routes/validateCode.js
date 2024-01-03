/**
 * Asynchronous function to validate the Cube.js schema.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to the client.
 * @param {Object} cubejs - The Cube.js server instance.
 * @returns {Promise} - A promise that resolves to a JSON object indicating the status of the validation.
 *
 * @throws {Error} - Throws an error if the schema compilation or validation fails.
 */
export default async (req, res, cubejs) => {
  try {
    if (cubejs.compilerCache) {
      cubejs.compilerCache.prune();
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      code: "code_compilation_error",
      message: err.message,
    });
  }

  const compilerApi = await cubejs.getCompilerApi(req);

  try {
    await compilerApi.metaConfig();
    res.json({ code: "ok", message: "Validation is OK" });
  } catch (err) {
    console.error(err);

    const { messages } = err;
    res
      .status(500)
      .json({ code: "code_validation_error", message: messages?.toString() });
  }
};
