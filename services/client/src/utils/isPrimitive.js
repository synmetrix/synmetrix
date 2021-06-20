const isPrimitive = (val) => {
  return val == null || /^[sbn]/.test(typeof val);
}

export default isPrimitive;
