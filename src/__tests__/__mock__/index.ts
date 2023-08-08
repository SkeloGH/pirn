import { IDataClient, IConfig, IQuery } from "interfaces";

const JSONDumpPath = process.cwd() + "/pirn-dump.json";
const client:IDataClient = {
  clientId: "client",
  type: "source",
  db: {
    url: "",
    name: "",
  },
};
const sourceClient:IDataClient = {
  ...client,
  type: "source",
  clientId: "source-client",
};
const targetClient:IDataClient = {
  ...client,
  type: "target",
  clientId: "target-client",
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

export {
  JSONDumpPath,
  sourceClient,
  targetClient,
  config,
  client,
  clients,
  query,
}