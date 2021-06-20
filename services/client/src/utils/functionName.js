export default function functionName(f) {
  const match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}