import { IConfig, IDataClient, IJsonConfig, IQuery } from './interfaces';

class Pirn {
  dataClients: IDataClient[];
  dataSources: IDataClient[];
  dataTargets: IDataClient[];
  jsonConfig: IJsonConfig;
  queries: IQuery[];
  /**
   * Pirn main class.
   *
   * Initializes dependencies based on given config and orchestrates
   * the overall import process.
   */
  constructor(config: IConfig) {
    // this.collect = new Collect(config);
    // this.digest = new Digest(config);
    this.queries = config.queries;
    this.dataClients = config.dataClients;
    this.jsonConfig = config.jsonConfig;
    this.dataSources = this.dataClients.filter((client) => client.type === 'source');
    this.dataTargets = this.dataClients.filter((client) => client.type === 'target');
  }
}

export default Pirn;
