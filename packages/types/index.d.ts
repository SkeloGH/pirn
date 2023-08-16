type TClientType = "source" | "target";
interface IDataClientOptions {
  ignoreFields?: string[];
  ignoreTables?: string[];
}
/**
 * @interface IDataClientDBConfig
 * @property {string} host - The host of the database
 * @property {string} name - The name of the database
 * @property {object} options - The options for the database
 * */
interface IDataClientDBConfig {
  host: string;
  name: string;
  options: {[key: string]: unknown};
}
/**
 * @interface IDataClientConfig
 * @property {IDataClientDBConfig} db - The database configuration
 * @property {TClientType} type - The type of client: "source" or "target"
 * @property {string} clientId - The id of the implementing client (this)
 * @property {string} sourceId - The id of the source client, only required for target clients
 * @property {IDataClientOptions} options - The client options
 */
interface IDataClientConfig {
  db: IDataClientDBConfig;
  type: TClientType;
  clientId: string;
  sourceId?: string;
  options?: IDataClientOptions;
}

interface IDataClient extends IDataClientConfig {
  /**
   * Client implementations should connect to the database, once the connection is established
   * the client should keep record of existing tables and fields.
   * @returns {Promise<object>}
   * @memberof IDataClient
   * */
  connect: () => Promise<object>;
  /**
   * After connecting the client, and adding queries, the fetch method can be called.
   * This method will recursively fetch data from the client, identifying foreign keys
   * along the way. Then it will store the data in a cache. This is an intensive process.
   *
   * Client implementation should:
   * 1. Use the query to fetch data, taking into account the ignoreFields and ignoreTables
   * 2. Cache the data
   * 3. Identify any fields that could be foreign keys
   * 4. Re-run the query, this time including the foreign keys
   * 5. Compare the results against the cached data
   * 6. Repeat steps 3-5 until no new foreign keys are found
   * 7. Store the results in the cache
   * 8. Return the results stats
   * @returns {Promise<unknown>}
   * @memberof IDataClient
   * */
  fetch: () => Promise<unknown>;
  dump: () => Promise<unknown>;
  load: () => Promise<unknown>;
  disconnect: () => Promise<unknown>;
  /**
   * Client implementation should transform the query into a format that the client can use
   * @param query
   * @returns
   * @memberof IDataClient
   * @example
   * // Example query
   *  {
   *    ...
   *    from: ["users"],
   *    where: {
   *      keys: ["id"],
   *      operator: "eq",
   *      value: "1",
   *    },
   * }
   * // Example transformed query for a SQL client
   *  "SELECT * FROM users WHERE id = 1",
   *
   **/
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
  where: {
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
  TQueryValue,
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