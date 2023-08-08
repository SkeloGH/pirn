import { IDataClient, IQuery } from '../interfaces';
import { spliceByKeyValue } from '../utils';

// Class properties
const dataClients: IDataClient[] = [];
const dataSources: IDataClient[] = [];
const dataTargets: IDataClient[] = [];
let JSONDumpPath: string = '';
const queries: IQuery[] = [];
// Client methods
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
// JSON dump path methods
const setJSONDumpPath = (path: string) => {
  JSONDumpPath = path;
  return JSONDumpPath;
};
const getJSONDumpPath = () => JSONDumpPath;
// Query methods
const addQuery = (query: IQuery) => queries.push(query);
const addQueries = (queries: IQuery[]) => queries.forEach(addQuery);
const removeQuery = (queryId: string) => spliceByKeyValue(queries, 'id', queryId);
const removeQueries = (queryIds: string[]) => queryIds.forEach(removeQuery);
const getQuery = (queryId: string) => queries.find(query => query.id === queryId);
const getQueries = (queryIds: string[]) => queryIds.map(getQuery);

export {
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
};
