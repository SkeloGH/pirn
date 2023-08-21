import { Db } from 'mongodb'
import {
  TClientType,
  IDataClientOptions,
  IDataClientDBConfig,
  IDataClient,
  IQuery,
  IIgnoreField,
  IIgnoreTable,
  IDataClientConfig
} from "@pirn/types";

import DatabaseAPI from "./db";
import QueryAPI from "./query";

export default class MongoDBClient implements IDataClient {
  public type: TClientType;
  public clientId: IDataClientConfig["clientId"];
  public sourceId?: IDataClientConfig["sourceId"];
  public options?: IDataClientOptions;
  public db: IDataClientDBConfig;
  protected DBAPI: DatabaseAPI;
  protected dbConnection?: Db;
  protected QueryAPI: QueryAPI;

  constructor(config: IDataClientConfig) {
    this.type = config.type;
    this.clientId = config.clientId;
    this.sourceId = config.sourceId;
    this.options = { ...config.options };
    this.db = { ...config.db };
    this.db.options = { ...config.db.options };
    this.options.ignoreFields = this.options.ignoreFields || [];
    this.options.ignoreTables = this.options.ignoreTables || [];
    this.validateConfig();
    this.DBAPI = new DatabaseAPI(this.db);
    this.QueryAPI = new QueryAPI();
  }

  private validateConfig = (): void => {
    if (this.type === "target"){
      if (!this.sourceId || this.sourceId === "") {
        throw new Error("sourceId is required");
      }
    }
  };

  connect = async (): Promise<Db> => {
    this.dbConnection = await this.DBAPI.connect();
    return this.dbConnection;
  };

  disconnect = async (): Promise<void> => {
    await this.DBAPI.disconnect();
  };

  fetch = async (): Promise<unknown[]> => {
    const queries = this.QueryAPI.getQueries();
    let results: unknown[] = [];
    const NO_QUERIES = 'No queries found';
    if (!queries.length) return Promise.reject(new Error(NO_QUERIES));
    // 1. Use the query to fetch data, taking into account the ignoreFields and ignoreTables
    // TODO: Implement ignoreFields and ignoreTables
    for (const query of queries) {
      results = await this.DBAPI.fetch(query);
    }
    // 2. Cache the data
    // 3. Identify any fields that could be foreign keys
    // 4. Re-run the query, this time including the foreign keys
    // 5. Compare the results against the cached data
    // 6. Repeat steps 3-5 until no new foreign keys are found
    // 7. Store the results in the cache
    // 8. Return the results stats
    return Promise.resolve(results);
  };

  dump = (): Promise<unknown> => {
    throw new Error('Not implemented');
  };
  load = (): Promise<unknown> => {
    throw new Error('Not implemented');
  };
  addQuery = (query: IQuery): IQuery[] => {
    return this.QueryAPI.addQuery(query);
  };
  addQueries = (queries: IQuery[]): IQuery[] => {
    return this.QueryAPI.addQueries(queries);
  };
  addIgnoreField = (): IIgnoreField[] => {
    throw new Error('Not implemented');
  };
  addIgnoreFields = (): IIgnoreField[] => {
    throw new Error('Not implemented');
  };
  addIgnoreTable = (): IIgnoreTable[] => {
    throw new Error('Not implemented');
  };
  addIgnoreTables = (): IIgnoreTable[] => {
    throw new Error('Not implemented');
  };
  removeQuery = (id: string): IQuery[] => {
    return this.QueryAPI.removeQuery(id);
  };
  removeQueries = (ids: string[]): IQuery[] => {
    return this.QueryAPI.removeQueries(ids);
  };
  removeIgnoreField = (): IIgnoreField[] => {
    throw new Error('Not implemented');
  };
  removeIgnoreFields = (): IIgnoreField[] => {
    throw new Error('Not implemented');
  };
  removeIgnoreTable = (): IIgnoreTable[] => {
    throw new Error('Not implemented');
  };
  removeIgnoreTables = (): IIgnoreTable[] => {
    throw new Error('Not implemented');
  };
  getQuery = (id: string): IQuery | undefined => {
    return this.QueryAPI.getQuery(id);
  };
  getQueries = (): IQuery[] => {
    return this.QueryAPI.getQueries();
  };
  getIgnoreFields = (): IIgnoreField[] => {
    throw new Error('Not implemented');
  };
  getIgnoreTables = (): IIgnoreTable[] => {
    throw new Error('Not implemented');
  };
}