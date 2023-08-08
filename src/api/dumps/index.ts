let JSONDumpPath: string = '';

const setJSONDumpPath = (path: string ='') => {
  JSONDumpPath = path;
  return JSONDumpPath;
};
const getJSONDumpPath = () => JSONDumpPath;

export {
  JSONDumpPath,
  setJSONDumpPath,
  getJSONDumpPath,
};
