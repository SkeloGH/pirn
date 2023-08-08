import { IDataClient } from 'interfaces';
import { spliceByKeyValue } from 'utils';

const dataClients: IDataClient[] = [];
const dataSources: IDataClient[] = [];
const dataTargets: IDataClient[] = [];

const addClient = (client: IDataClient) => {
  dataClients.push(client);
  if (client.type === 'source') {
    dataSources.push(client);
  } else if (client.type === 'target') {
    dataTargets.push(client);
  }
}
const addClients = (clients: IDataClient[]) => clients.forEach(addClient);
const removeClient = (clientId: string) => {
  spliceByKeyValue(dataClients, 'clientId', clientId);
  spliceByKeyValue(dataSources, 'clientId', clientId);
  spliceByKeyValue(dataTargets, 'clientId', clientId);
  return dataClients;
}
const removeClients = (clientIds: string[]) => clientIds.forEach(removeClient);
const getClient = (clientId: string) => dataClients.find(client => client.clientId === clientId);
const getClients = (clientIds: string[]) => clientIds.map(getClient);

export {
  dataClients,
  dataSources,
  dataTargets,
  addClient,
  addClients,
  removeClient,
  removeClients,
  getClient,
  getClients,
};
