import { IConfig, IDataClient, IJsonConfig, IQuery } from './interfaces';

const filterByType = (type: string) => (client: IDataClient) => client.type === type;

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
    this.dataClients = config.dataClients;
    this.dataSources = this.dataClients.filter(filterByType('source'));
    this.dataTargets = this.dataClients.filter(filterByType('target'));
    this.jsonConfig = config.jsonConfig;
    this.queries = config.queries;
  }
}

export { Pirn, filterByType };
