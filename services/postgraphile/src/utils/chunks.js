export const numToChunks = (number, chunkSize) => {
  const chunks = [];
  let remain = number;

  while (remain > 0) {
    const limit = remain > chunkSize ? chunkSize : remain;
    const offset = number - remain;

    chunks.push({ limit, offset });

    remain -= chunkSize;
  }

  return chunks;
};