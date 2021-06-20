export default (arr, chunkSize) => {
  const chunks = [];

  let resArr = arr;
  while (resArr.length) {
    const chunk = resArr.slice(0, chunkSize);
    chunks.push(chunk);

    resArr = resArr.slice(chunkSize);
  }

  return chunks;
};
