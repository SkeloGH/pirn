interface IDataClient {
  type: "source" | "target";
  origin?: IDataClient;
  clientId: string;
  db: {
    url: string;
    name: string;
    options?: object;
  };
  options?: {
    ignoreFields?: string[];
    ignoreTables?: string[];
  };
  connect: () => Promise<unknown>;
  fetch: () => Promise<unknown>;
  dump: () => Promise<unknown>;
  disconnect: () => Promise<unknown>;
  addQuery: (query: IQuery) => IQuery[];
  addQueries: (queries: IQuery[]) => IQuery[];
  addIgnoreField: (ignoreField: IIgnoreField) => IIgnoreField[];
  addIgnoreFields: (ignoreFields: IIgnoreField[]) => IIgnoreField[];
  addIgnoreTable: (ignoreTable: IIgnoreTable) => IIgnoreTable[];
  addIgnoreTables: (ignoreTables: IIgnoreTable[]) => IIgnoreTable[];
  removeQuery: (queryId: string) => IQuery[];
  removeQueries: (queryIds: string[]) => IQuery[];
  removeIgnoreField: (ignoreFieldId: string) => IIgnoreField[];
  removeIgnoreFields: (ignoreFieldIds: string[]) => IIgnoreField[];
  removeIgnoreTable: (ignoreTableId: string) => IIgnoreTable[];
  removeIgnoreTables: (ignoreTableIds: string[]) => IIgnoreTable[];
  getQuery: (queryId: string) => IQuery | undefined;
  getQueries: (queryIds?: string[]) => IQuery[];
  getIgnoreFields: () => IIgnoreField[];
  getIgnoreTables: () => IIgnoreTable[];
}
interface IQuery {
  id: string;
  clientId?: string;
  from: string[];
  where: string | {
    keys: string[];
    operator: "eq" | "like" | "in";
    value: string | string[] | object | object[];
  };
}
interface IConfig {
  dataClients?: IDataClient[];
  JSONDumpPath?: string;
  queries?: IQuery[];
}

interface IIgnoreField {
  clientId: string;
  field: string;
}
interface IIgnoreTable {
  clientId: string;
  table: string;
}

export { IDataClient, IQuery, IConfig, IIgnoreField, IIgnoreTable };
