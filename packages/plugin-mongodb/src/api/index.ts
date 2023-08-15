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

export default class MongoDBClient implements IDataClient {
  public type: TClientType;
  public clientId: IDataClientConfig["clientId"];
  public sourceId?: IDataClientConfig["sourceId"];
  public options?: IDataClientOptions;
  public db: IDataClientDBConfig;
  protected dbAPI: DatabaseAPI;
  protected dbConnection?: Db;

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
    this.dbAPI = new DatabaseAPI(this.db);
  }

  private validateConfig = (): void => {
    if (this.type === "target"){
      if (!this.sourceId || this.sourceId === "") {
        throw new Error("sourceId is required");
      }
    }
  };


  connect = async (): Promise<Db> => {
    this.dbConnection = await this.dbAPI.connect();
    return this.dbConnection;
  };
  disconnect = async (): Promise<void> => {
    await this.dbAPI.disconnect();
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
  addQuery = (): IQuery[] => {
    throw new Error('Not implemented');
  };
  addQueries = (): IQuery[] => {
    throw new Error('Not implemented');
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
  removeQuery = (): IQuery[] => {
    throw new Error('Not implemented');
  };
  removeQueries = (): IQuery[] => {
    throw new Error('Not implemented');
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
  getQuery = (): IQuery => {
    throw new Error('Not implemented');
  };
  getQueries = (): IQuery[] => {
    throw new Error('Not implemented');
  };
  getIgnoreFields = (): IIgnoreField[] => {
    throw new Error('Not implemented');
  };
  getIgnoreTables = (): IIgnoreTable[] => {
    throw new Error('Not implemented');
  };
}