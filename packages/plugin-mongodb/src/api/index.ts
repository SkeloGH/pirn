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
  query = (): Promise<unknown> => {
    throw new Error('Not implemented');
  };
  fetch = (): Promise<unknown> => {
    throw new Error('Not implemented');
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