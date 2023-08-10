import { IDataClient, IConfig, IQuery, IIgnoreField, IIgnoreTable } from "interfaces";
import MockDataClient from "./dataClient";

const JSONDumpPath = process.cwd() + "/pirn-dump.json";
const client:IDataClient = new MockDataClient();
const sourceClient:IDataClient = {
  ...new MockDataClient(),
  type: "source",
  clientId: "source-client",
};
const targetClient:IDataClient = {
  ...new MockDataClient(),
  type: "target",
  clientId: "target-client",
  origin: sourceClient.clientId,
};

const clients:IDataClient[] = [ sourceClient, targetClient];
const config:IConfig = {
  dataClients: [sourceClient, targetClient],
  queries: [],
  JSONDumpPath,
};
const query:IQuery = {
  id: "query",
  clientId: "client",
  from: ["table"],
  where: {
    keys: ["columnName"],
    operator: "eq",
    value: "value",
  },
};

const ignoreField:IIgnoreField = {
  clientId: "client",
  field: "password",
}
const ignoreFields:IIgnoreField[] = [ignoreField];
const ignoreTable:IIgnoreTable = {
  clientId: "client",
  table: "secrets",
};
const ignoreTables:IIgnoreTable[] = [ignoreTable];

export {
  JSONDumpPath,
  sourceClient,
  targetClient,
  config,
  client,
  clients,
  query,
  ignoreField,
  ignoreFields,
  ignoreTable,
  ignoreTables,
}