import { IConfig, IDataClient, IQuery, IIgnoreField, IIgnoreTable } from 'interfaces';
import {
  dataClients,
  dataSources,
  dataTargets,
  addClient,
  addClients,
  removeClient,
  removeClients,
  getClient,
  getClients,
} from 'api/clients';
import {
  setJSONDumpPath,
  getJSONDumpPath,
} from 'api/dumps';
import {
  queries,
  addQuery,
  addQueries,
  removeQuery,
  removeQueries,
  getQuery,
  getQueries,
} from 'api/queries';
import {
  addIgnoreField,
  addIgnoreFields,
  removeIgnoreField,
  removeIgnoreFields,
  getIgnoreFields,
  addIgnoreTable,
  addIgnoreTables,
  removeIgnoreTable,
  removeIgnoreTables,
  getIgnoreTables,
} from 'api/ignores';


class Pirn {
  public dataClients: IDataClient[] = [];
  public dataSources: IDataClient[] = [];
  public dataTargets: IDataClient[] = [];
  public JSONDumpPath?: string = undefined;
  public queries: IQuery[] = [];
  public ignoreFields: IIgnoreField[] = [];
  public ignoreTables: IIgnoreTable[] = [];

  constructor(config?: IConfig) {
    if (config) {
      if (config.dataClients) this.addClients(config.dataClients);
      if (config.JSONDumpPath) this.setJSONDumpPath(config.JSONDumpPath);
      if (config.queries) this.addQueries(config.queries);
    }
  }

  // Client methods
  private resetDataClients = () => {
    this.dataClients = dataClients;
    this.dataSources = dataSources;
    this.dataTargets = dataTargets;
  }

  public addClient = (client: IDataClient) => {
    addClient(client);
    this.resetDataClients();
  }
  public addClients = (clients: IDataClient[]) => {
    addClients(clients);
    this.resetDataClients();
  }
  public removeClient = (clientId: string) => {
    removeClient(clientId);
    this.resetDataClients();
  }
  public removeClients = (clientIds: string[]) => {
    removeClients(clientIds);
    this.resetDataClients();
  }
  public getClient = getClient;
  public getClients = getClients;

  // JSON dump path methods
  public setJSONDumpPath = (path: string) => {
    this.JSONDumpPath = setJSONDumpPath(path);
  }
  public getJSONDumpPath = getJSONDumpPath;

  // Query methods
  public addQuery = (query: IQuery) => {
    addQuery(query);
    this.queries = queries;
  }
  public addQueries = (queries: IQuery[]) => {
    addQueries(queries);
    this.queries = queries;
  }
  public removeQuery = (queryId: string) => {
    removeQuery(queryId);
    this.queries = queries;
  }
  public removeQueries = (queryIds: string[]) => {
    removeQueries(queryIds);
    this.queries = queries;
  }
  public getQuery = getQuery
  public getQueries = getQueries

  // Ignore field methods
  public addIgnoreField = (clientId: string, field: string) => {
    this.ignoreFields = addIgnoreField(clientId, field);
  }
  public addIgnoreFields = (clientId: string, fields: string[]) => {
    this.ignoreFields = addIgnoreFields(clientId, fields);
  }
  public removeIgnoreField = (clientId: string, field: string) => {
    this.ignoreFields = removeIgnoreField(clientId, field);
  }
  public removeIgnoreFields = (clientId: string, fields: string[]) => {
    this.ignoreFields = removeIgnoreFields(clientId, fields);
  }
  public getIgnoreFields = getIgnoreFields;

  // Ignore table methods
  public addIgnoreTable = (clientId: string, table: string) => {
    this.ignoreTables = addIgnoreTable(clientId, table);
  }
  public addIgnoreTables = (clientId: string, tables: string[]) => {
    this.ignoreTables = addIgnoreTables(clientId, tables);
  }
  public removeIgnoreTable = (clientId: string, table: string) => {
    this.ignoreTables = removeIgnoreTable(clientId, table);
  }
  public removeIgnoreTables = (clientId: string, tables: string[]) => {
    this.ignoreTables = removeIgnoreTables(clientId, tables);
  }
  public getIgnoreTables = getIgnoreTables;
}

export default Pirn;