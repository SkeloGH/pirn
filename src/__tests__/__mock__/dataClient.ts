import { IDataClient } from "interfaces";
import QueriesAPI from "api/queries";
import IgnoresAPI from "api/ignores";

class MockDataClient implements IDataClient {
  private queriesAPI: QueriesAPI = new QueriesAPI();
  private ignoresAPI: IgnoresAPI = new IgnoresAPI();
  public type: "source" | "target" = "source";
  public clientId: string = "client";
  public db = {
    url: "url",
    name: "name",
    options: {},
  };
  public options = {
    ignoreFields: [],
    ignoreTables: [],
  };
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
