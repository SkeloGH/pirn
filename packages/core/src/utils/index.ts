const spliceByKeyValue = (source: Array<object>, key: string, value: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const index = source.findIndex((item: {[key: string]: any}) => item[key] === value);
  if (index > -1) source.splice(index, 1);
  return source;
};

export { spliceByKeyValue };
