import crypto from "crypto";

const createMd5Hex = (data) => {
  let source = data;

  if (typeof data === "object") {
    source = JSON.stringify(data);
  }

  const hex = crypto.createHash("md5").update(source).digest("hex");

  return hex;
};

export default createMd5Hex;
