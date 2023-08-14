import { IConfig, IQuery } from '@pirn/types';
import DataClientsAPI from '../api/clients';
import QueriesAPI from '../api/queries';
import DumpsAPI from '../api/dumps';
import IgnoresAPI from '../api/ignores';

export default class Pirn {
  private clientsAPI = new DataClientsAPI();
  private queriesAPI = new QueriesAPI();
  private dumpsAPI = new DumpsAPI();
  private ignoresAPI = new IgnoresAPI();

  constructor(config?: IConfig) {
    if (config) {
      if (config.dataClients) this.addClients(config.dataClients);
      if (config.JSONDumpPath) this.setJSONDumpPath(config.JSONDumpPath);
      if (config.queries) this.addQueries(config.queries);
    }
  }
  // Client methods
  public addClient = this.clientsAPI.addClient;
  public addClients = this.clientsAPI.addClients;
  public removeClient = this.clientsAPI.removeClient
  public removeClients = this.clientsAPI.removeClients;
  public getClient = this.clientsAPI.getClient;
  public getClients = this.clientsAPI.getClients;
  public getSourceClients = this.clientsAPI.getSourceClients;
  public getTargetClients = this.clientsAPI.getTargetClients;
  public resetDataClients = this.clientsAPI.resetDataClients;
  public connect = this.clientsAPI.connect;
  public connectAll = this.clientsAPI.connectAll;
  public dump = this.clientsAPI.dump;
  public disconnect = this.clientsAPI.disconnect;
  public disconnectAll = this.clientsAPI.disconnectAll;
  public fetch = () => {
    const queries = this.getQueries();
    const clients = this.getClients();

    if (queries.length === 0) return Promise.reject(new Error('No queries found'));
    if (clients.length === 0) return Promise.reject(new Error('No clients found'));

    return Promise.all(clients.map(client => client.fetch()));
  }

  // JSON dump path methods
  public setJSONDumpPath = this.dumpsAPI.setJSONDumpPath;
  public getJSONDumpPath = this.dumpsAPI.getJSONDumpPath;

  // Query methods
  public removeQuery = this.queriesAPI.removeQuery;
  public removeQueries = this.queriesAPI.removeQueries;
  public getQuery = this.queriesAPI.getQuery;
  public getQueries = this.queriesAPI.getQueries;
  public addQuery = (query: IQuery) => {
    if (query.clientId) {
      const client = this.clientsAPI.getClient(query.clientId);
      if (client) client.addQuery(query);
      if (!client) throw new Error(`Client ${query.clientId} not found`);
    } else {
      const clients = this.clientsAPI.getClients();
      clients.forEach(client => client.addQuery(query));
    }
    return this.queriesAPI.addQuery(query);
  }
  public addQueries = (queries: IQuery[]) => {
    queries.forEach(this.addQuery);
    return this.queriesAPI.getQueries();
  }

  // Ignore field methods
  public addIgnoreField = this.ignoresAPI.addIgnoreField;
  public addIgnoreFields = this.ignoresAPI.addIgnoreFields;
  public removeIgnoreField = this.ignoresAPI.removeIgnoreField;
  public removeIgnoreFields = this.ignoresAPI.removeIgnoreFields;
  public getIgnoreFields = this.ignoresAPI.getIgnoreFields;

  // Ignore table methods
  public addIgnoreTable = this.ignoresAPI.addIgnoreTable;
  public addIgnoreTables = this.ignoresAPI.addIgnoreTables;
  public removeIgnoreTable = this.ignoresAPI.removeIgnoreTable;
  public removeIgnoreTables = this.ignoresAPI.removeIgnoreTables;
  public getIgnoreTables = this.ignoresAPI.getIgnoreTables;

}
