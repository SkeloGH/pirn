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

export default class DataClient implements IDataClient {
  public type: TClientType;
  public clientId: IDataClientConfig["clientId"];
  public sourceId?: IDataClientConfig["sourceId"];
  public options?: IDataClientOptions;
  public db: IDataClientDBConfig;

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
  }

  private validateConfig = (): void => {
    if (this.type === "target"){
      if (!this.sourceId || this.sourceId === "") {
        throw new Error("sourceId is required");
      }
    }
  };


  connect = (): Promise<unknown> => {
    throw new Error('Not implemented');
  };
  disconnect = (): Promise<unknown> => {
    throw new Error('Not implemented');
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