import { IDataClientOptions, IDataClient, IDataClientDBConfig, TClientType } from "interfaces";

class MockDataClient implements IDataClient {
  public type: TClientType = "source";
  public clientId: string = "mock-client";
  public db: IDataClientDBConfig = {
    url: "mock://url",
    name: "mock-name",
  };
  public options?: IDataClientOptions;

  public connect = jest.fn();
  public fetch = jest.fn();
  public dump = jest.fn();
  public disconnect = jest.fn();
  
  public addQuery = jest.fn();
  public addQueries = jest.fn();
  public getQuery = jest.fn();
  public getQueries = jest.fn();
  public removeQuery = jest.fn();
  public removeQueries = jest.fn();
  
  // Field methods
  public addIgnoreField = jest.fn();
  public addIgnoreFields = jest.fn();
  public removeIgnoreField = jest.fn();
  public removeIgnoreFields = jest.fn();
  public getIgnoreFields = jest.fn();
  
  // Table methods
  public addIgnoreTable = jest.fn();
  public addIgnoreTables = jest.fn();
  public removeIgnoreTable = jest.fn();
  public removeIgnoreTables = jest.fn();
  public getIgnoreTables = jest.fn();
}

export default MockDataClient;
