import { IDataClient, IIgnoreField, IIgnoreTable } from "interfaces";
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
  public addQueries = this.queriesAPI.addQueries;
  public getQuery = this.queriesAPI.getQuery;
  public getQueries = this.queriesAPI.getQueries;
  public removeQuery = this.queriesAPI.removeQuery;
  public removeQueries = this.queriesAPI.removeQueries;
  
  // Field methods
  public addIgnoreField = (ignoreField: IIgnoreField) => {
    this.ignoresAPI.addIgnoreField(ignoreField.clientId, ignoreField.field);
    return this.options.ignoreFields;
  };
  public addIgnoreFields = (ignoreFields: IIgnoreField[]) => {
    ignoreFields.forEach(ignoreField => this.addIgnoreField(ignoreField));
    return this.options.ignoreFields;
  }
  public removeIgnoreField = (ignoreFieldId: string) => {
    this.ignoresAPI.removeIgnoreField(this.clientId, ignoreFieldId);
    return this.options.ignoreFields;
  }
  public removeIgnoreFields = (ignoreFieldIds: string[]) => {
    ignoreFieldIds.forEach(ignoreFieldId => this.removeIgnoreField(ignoreFieldId));
    return this.options.ignoreFields;
  }
  public getIgnoreFields = () => this.options.ignoreFields;
  
  // Table methods
  public addIgnoreTable = (ignoreTable: IIgnoreTable) => {
    this.ignoresAPI.addIgnoreTable(ignoreTable.clientId, ignoreTable.table);
    return this.options.ignoreTables;
  }
  public addIgnoreTables = (ignoreTables: IIgnoreTable[]) => {
    ignoreTables.forEach(ignoreTable => this.addIgnoreTable(ignoreTable));
    return this.options.ignoreTables;
  }
  public removeIgnoreTable = (ignoreTableId: string) => {
    this.ignoresAPI.removeIgnoreTable(this.clientId, ignoreTableId);
    return this.options.ignoreTables;
  }
  public removeIgnoreTables = (ignoreTableIds: string[]) => {
    ignoreTableIds.forEach(ignoreTableId => this.removeIgnoreTable(ignoreTableId));
    return this.options.ignoreTables;
  }
  public getIgnoreTables = () => this.options.ignoreTables;
}

export default MockDataClient;
