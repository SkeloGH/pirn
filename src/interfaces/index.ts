type TClientType = "source" | "target";
interface IDataClientOptions {
  ignoreFields?: string[];
  ignoreTables?: string[];
}
interface IDataClientDBConfig {
  url: string;
  name: string;
  options?: object;
}
interface IDataClientConfig {
  type: TClientType;
  clientId: string;
  origin?: string;
  db: IDataClientDBConfig;
  options?: IDataClientOptions
}

interface IDataClient extends IDataClientConfig {
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
type TQueryOperator = "eq" | "like" | "in";
type TQueryValue = string | string[] | object | object[];
interface IQuery {
  id: string;
  clientId?: string;
  from: string[];
  where: string | {
    keys: string[];
    operator: TQueryOperator;
    value: TQueryValue;
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

export { 
  TClientType,
  IDataClientOptions,
  IDataClientDBConfig,
  IDataClientConfig,
  IDataClient,
  TQueryOperator,
  IQuery,
  IConfig,
  IIgnoreField,
  IIgnoreTable
};