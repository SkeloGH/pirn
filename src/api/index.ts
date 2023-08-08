import { IConfig } from 'interfaces';
import DataClientsAPI from 'api/clients';
import QueriesAPI from 'api/queries';
import DumpsAPI from 'api/dumps';
import IgnoresAPI from 'api/ignores';


class Pirn {
  private clientsAPI: DataClientsAPI = new DataClientsAPI();
  private queriesAPI: QueriesAPI = new QueriesAPI();
  private dumpsAPI: DumpsAPI = new DumpsAPI();
  private ignoresAPI: IgnoresAPI = new IgnoresAPI();

  constructor(config?: IConfig) {
    if (config) {
      if (config.dataClients) this.clientsAPI.addClients(config.dataClients);
      if (config.JSONDumpPath) this.dumpsAPI.setJSONDumpPath(config.JSONDumpPath);
      if (config.queries) this.addQueries(config.queries);
    }
  }

  // Client methods
  public addClient = this.clientsAPI.addClient;
  public addClients = this.clientsAPI.addClients;
  public removeClient = this.clientsAPI.removeClient;
  public removeClients = this.clientsAPI.removeClients;
  public getClient = this.clientsAPI.getClient;
  public getClients = this.clientsAPI.getClients;
  public getSourceClients = this.clientsAPI.getSourceClients;
  public getTargetClients = this.clientsAPI.getTargetClients;
  public resetDataClients = this.clientsAPI.resetDataClients;

  // JSON dump path methods
  public setJSONDumpPath = this.dumpsAPI.setJSONDumpPath;
  public getJSONDumpPath = this.dumpsAPI.getJSONDumpPath;

  // Query methods
  public addQuery = this.queriesAPI.addQuery;
  public addQueries = this.queriesAPI.addQueries;
  public removeQuery = this.queriesAPI.removeQuery;
  public removeQueries = this.queriesAPI.removeQueries;
  public getQuery = this.queriesAPI.getQuery;
  public getQueries = this.queriesAPI.getQueries;

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



export default Pirn;