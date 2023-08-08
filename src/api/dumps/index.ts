type TJSONDumpPath = string | undefined;
let JSONDumpPath: TJSONDumpPath;

const setJSONDumpPath = (path: TJSONDumpPath):TJSONDumpPath => {
  JSONDumpPath = path;
  return JSONDumpPath;
};
const getJSONDumpPath = ():TJSONDumpPath => JSONDumpPath;

export {
  JSONDumpPath,
  setJSONDumpPath,
  getJSONDumpPath,
};
