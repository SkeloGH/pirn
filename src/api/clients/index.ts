import { IDataClient } from 'interfaces';
import { spliceByKeyValue } from 'utils';

class DataClientsAPI {
  private dataClients: IDataClient[] = [];
  private dataSources: IDataClient[] = [];
  private dataTargets: IDataClient[] = [];

  resetDataClients = async () => {
    await this.disconnectAll();
    this.dataClients = [];
    this.dataSources = [];
    this.dataTargets = [];
  }
  addClient = (client: IDataClient) => {
    this.dataClients.push(client);
    if (client.type === 'source') {
      this.dataSources.push(client);
    } else if (client.type === 'target') {
      this.dataTargets.push(client);
    }
    return this.dataClients;
  }
  addClients = (clients: IDataClient[]) => {
    for (const client of clients) {
      this.addClient(client);
    }
    return this.dataClients;
  }
  removeClient = async (clientId: string) => {
    const client = this.getClient(clientId);
    if (client) await client.disconnect();
    spliceByKeyValue(this.dataClients, 'clientId', clientId);
    spliceByKeyValue(this.dataSources, 'clientId', clientId);
    spliceByKeyValue(this.dataTargets, 'clientId', clientId);
    return this.dataClients;
  }
  removeClients = async (clientIds: string[]) => {
    for (const clientId of clientIds) {
      await this.removeClient(clientId);
    }
    return this.dataClients;
  }
  getClient = (clientId: string) => this.dataClients.find(client => client.clientId === clientId);
  getClients = (clientIds?: string[]) => {
    if (clientIds) {
      return this.dataClients.filter(client => clientIds.includes(client.clientId));
    }
    return this.dataClients;
  }
  getSourceClients = () => {
    return this.dataSources;
  }
  getTargetClients = () => {
    return this.dataTargets;
  }

  connect = async (clientId: string) => {
    const client = this.getClient(clientId);
    if (client) {
      await client.connect();
      return client;
    }
    return Promise.reject(new Error(`Client ${clientId} not found`));
  }
  connectAll = async () => {
    for (const client of this.dataClients) {
      await client.connect();
    }
    return this.dataClients;
  }

  dump = () => {
    return Promise.all(this.dataClients.map(client => client.dump()));
  }

  disconnect = async (clientId: string) => {
    const client = this.getClient(clientId);
    if (client) {
      await client.disconnect();
      return client;
    }
    return Promise.reject(new Error(`Client ${clientId} not found`));
  }
  disconnectAll = async () => {
    for (const client of this.dataClients) {
      await client.disconnect();
    }
    return this.dataClients;
  }
}




export default DataClientsAPI;
