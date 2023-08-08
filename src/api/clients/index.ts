import { IDataClient } from 'interfaces';
import { spliceByKeyValue } from 'utils';

class DataClientsAPI {
  private dataClients: IDataClient[] = [];
  private dataSources: IDataClient[] = [];
  private dataTargets: IDataClient[] = [];

  resetDataClients = () => {
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
    clients.forEach(this.addClient);
    return this.dataClients;
  }
  removeClient = (clientId: string) => {
    spliceByKeyValue(this.dataClients, 'clientId', clientId);
    spliceByKeyValue(this.dataSources, 'clientId', clientId);
    spliceByKeyValue(this.dataTargets, 'clientId', clientId);
    return this.dataClients;
  }
  removeClients = (clientIds: string[]) => {
    clientIds.forEach(this.removeClient);
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

  connect = (clientId: string) => {
    const client = this.getClient(clientId);
    if (client) return client.connect();
    return Promise.reject(new Error(`Client ${clientId} not found`));
  }
  connectAll = () => {
    return Promise.all(this.dataClients.map(client => this.connect(client.clientId)));
  }

  fetch = () => {
    return Promise.all(this.dataClients.map(client => client.fetch()));
  }

  dump = () => {
    return Promise.all(this.dataClients.map(client => client.dump()));
  }

  disconnect = (clientId: string) => {
    const client = this.getClient(clientId);
    if (client) return client.disconnect();
    return Promise.reject(new Error(`Client ${clientId} not found`));
  }
  disconnectAll = () => {
    return Promise.all(this.dataClients.map(client => this.disconnect(client.clientId)));
  }
}




export default DataClientsAPI;
