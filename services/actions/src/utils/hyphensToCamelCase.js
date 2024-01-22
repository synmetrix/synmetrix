const hyphensToCamelCase = (str) => {
  const arr = str.split(/[_-]/);
  let newStr = "";
  for (let i = 1; i < arr.length; i += 1) {
    newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr[0] + newStr;
};

export default hyphensToCamelCase;
