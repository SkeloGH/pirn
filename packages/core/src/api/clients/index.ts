import { IDataClient } from '@pirn/types';
import { spliceByKeyValue } from '../../utils';

class DataClientsAPI {
  private dataClients: IDataClient[] = [];
  private dataSources: IDataClient[] = [];
  private dataTargets: IDataClient[] = [];

  /**
   *
   * Disconnects all clients and removes them from the clients registries.
   * @memberof DataClientsAPI
   * @returns {IDataClient[]}
   * */
  resetDataClients = async () => {
    await this.disconnectAll();
    this.dataClients = [];
    this.dataSources = [];
    this.dataTargets = [];
    return this.dataClients;
  }
  /**
   *
   * Depending on the client type, adds the client to the dataSources or dataTargets array,
   * it also keeps record of all clients in the dataClients array.
   * @param {IDataClient} client
   * @returns {IDataClient | undefined}
   * @memberof DataClientsAPI
   * */
  addClient = (client: IDataClient) => {
    this.dataClients.push(client);
    if (client.type === 'source') {
      this.dataSources.push(client);
    } else if (client.type === 'target') {
      if (!client.sourceId) throw new Error(`Target client ${client.clientId} needs a sourceId`);
      this.dataTargets.push(client);
    }
    return this.dataClients;
  }
  /**
   *
   * Depending on the client type, adds the client to the dataSources or dataTargets array,
   * it also keeps record of all clients in the dataClients array.
   * @param {IDataClient[]} clients
   * @returns {IDataClient[]}
   * @memberof DataClientsAPI
   * */
  addClients = (clients: IDataClient[]) => {
    for (const client of clients) {
      this.addClient(client);
    }
    return this.dataClients;
  }
  /**
   *
   * Disconnects the client and removes it from the clients registries.
   * @param {string} clientId
   * @returns {IDataClient[]}
   * @memberof DataClientsAPI
   * */
  removeClient = async (clientId: string) => {
    const client = this.getClient(clientId);
    if (client) await client.disconnect();
    spliceByKeyValue(this.dataClients, 'clientId', clientId);
    spliceByKeyValue(this.dataSources, 'clientId', clientId);
    spliceByKeyValue(this.dataTargets, 'clientId', clientId);
    return this.dataClients;
  }
  /**
   *
   * Disconnects the clients and removes them from the clients registries.
   * @param {string[]} clientIds
   * @returns {IDataClient[]}
   * @memberof DataClientsAPI
   * */
  removeClients = async (clientIds: string[]) => {
    for (const clientId of clientIds) {
      await this.removeClient(clientId);
    }
    return this.dataClients;
  }
  /**
   *
   * Returns the client with the given clientId.
   * @param {string} clientId
   * @returns {(IDataClient | undefined)}
   * @memberof DataClientsAPI
   * */
  getClient = (clientId: string) => this.dataClients.find(client => client.clientId === clientId);
  /**
   *
   * Returns the clients with the given clientIds.
   * @param {string[]} clientIds
   * @returns {(IDataClient[])}
   * @memberof DataClientsAPI
   * */
  getClients = (clientIds?: string[]) => {
    if (clientIds) {
      return this.dataClients.filter(client => clientIds.includes(client.clientId));
    }
    return this.dataClients;
  }
  /**
   *
   * Returns the clients of type source.
   * @returns {(IDataClient[])}
   * @memberof DataClientsAPI
   * */
  getSourceClients = () => {
    return this.dataSources;
  }
  /**
   *
   * Returns the clients of type target.
   * @returns {(IDataClient[])}
   * @memberof DataClientsAPI
   * */
  getTargetClients = () => {
    return this.dataTargets;
  }
  /**
   *
   * Connects the client with the given clientId. Each client has its own connect implementation.
   * If the client is not found, it returns a rejected promise.
   * @param {string} clientId
   * @returns {(Promise<IDataClient | undefined>)}
   * @memberof DataClientsAPI
   * */
  connect = async (clientId: string) => {
    const client = this.getClient(clientId);
    if (client) {
      await client.connect();
      return client;
    }
    return Promise.reject(new Error(`Client ${clientId} not found`));
  }
  /**
   *
   * Connects all clients. Each client has its own connect implementation.
   * @returns {(Promise<IDataClient[]>)}
   * @memberof DataClientsAPI
   * */
  connectAll = async () => {
    for (const client of this.dataClients) {
      await client.connect();
    }
    return this.dataClients;
  }
  /**
   *
   * Disconnects the client with the given clientId.
   * Each client has its own disconnect implementation.
   * If the client is not found, it returns a rejected promise.
   * @param {string} clientId
   * @returns {(Promise<IDataClient | undefined>)}
   * @memberof DataClientsAPI
   * */
  disconnect = async (clientId: string) => {
    const client = this.getClient(clientId);
    if (client) {
      await client.disconnect();
      return client;
    }
    return Promise.reject(new Error(`Client ${clientId} not found`));
  }
  /**
   *
   * Disconnects all clients. Each client has its own disconnect implementation.
   * @returns {(Promise<IDataClient[]>)}
   * @memberof DataClientsAPI
   * */
  disconnectAll = async () => {
    for (const client of this.dataClients) {
      await client.disconnect();
    }
    return this.dataClients;
  }
  /**
   *
   * After fetching the data from the dataSources, it loads the data into the dataTargets.
   * @returns {Promise<any[]>}
   * @memberof DataClientsAPI
   * */
  dump = async () => {
    const results = [];
    for (const client of this.dataSources) {
      const result = await client.dump();
      results.push(result);
    }
    for (const client of this.dataTargets) {
      await client.load();
    }
    return results;
  }
}

export default DataClientsAPI;
