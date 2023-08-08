import { IConfig, IDataClient, IQuery } from '../interfaces';
import {
  dataClients,
  dataSources,
  dataTargets,
  JSONDumpPath,
  queries,
  addClient,
  addClients,
  removeClient,
  removeClients,
  getClient,
  getClients,
  setJSONDumpPath,
  getJSONDumpPath,
  addQuery,
  addQueries,
  removeQuery,
  removeQueries,
  getQuery,
  getQueries,
} from './methods';


class Pirn {
  public dataClients: IDataClient[] = [];
  public dataSources: IDataClient[] = [];
  public dataTargets: IDataClient[] = [];
  public JSONDumpPath?: string = undefined;
  public queries: IQuery[] = [];

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
    setJSONDumpPath(path);
    this.JSONDumpPath = JSONDumpPath;
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
}

export default Pirn;