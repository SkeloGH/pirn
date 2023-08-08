import { IDataClient, IConfig, IQuery } from "../interfaces";
import { spliceByKeyValue } from "../utils";
import Pirn from "../api";

const JSONDumpPath = process.cwd() + "/pirn-dump.json";
const sourceClient:IDataClient = {
  clientId: "source-client",
  type: "source",
  db: {
    url: "",
    name: "",
  },
};
const targetClient:IDataClient = {
  clientId: "target-client",
  type: "target",
  db: {
    url: "",
    name: "",
  },
};
const config:IConfig = {
  dataClients: [sourceClient, targetClient],
  queries: [],
  JSONDumpPath,
};
const client:IDataClient = {
  clientId: "client",
  type: "source",
  db: {
    url: "",
    name: "",
  },
};
const clients:IDataClient[] = [
  {
    clientId: "client1",
    type: "source",
    db: {
      url: "",
      name: "",
    },
  },
  {
    clientId: "client2",
    type: "target",
    db: {
      url: "",
      name: "",
    },
  },
];
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
const pirn = new Pirn(config);

describe("utils tests", () => {
  it("should splice by key value", () => {
    const source = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const result = spliceByKeyValue(source, "id", "2");
    expect(result).toEqual([{ id: "1" }, { id: "3" }]);
  });
});

describe("Pirn main class base tests", () => {
  it("should have the class properties", () => {
    expect(pirn.dataClients).toEqual(config.dataClients);
    expect(pirn.dataSources).toEqual([sourceClient]);
    expect(pirn.dataTargets).toEqual([targetClient]);
    expect(pirn.JSONDumpPath).toEqual(config.JSONDumpPath);
    expect(pirn.queries).toEqual(config.queries);
  });
  it("should have the public methods", () => {
    expect(pirn.addClient).toBeDefined();
    expect(pirn.addClients).toBeDefined();
    expect(pirn.removeClient).toBeDefined();
    expect(pirn.removeClients).toBeDefined();
    expect(pirn.getClient).toBeDefined();
    expect(pirn.getClients).toBeDefined();
    expect(pirn.setJSONDumpPath).toBeDefined();
    expect(pirn.getJSONDumpPath).toBeDefined();
    expect(pirn.addQuery).toBeDefined();
    expect(pirn.addQueries).toBeDefined();
    expect(pirn.removeQuery).toBeDefined();
    expect(pirn.removeQueries).toBeDefined();
    expect(pirn.getQuery).toBeDefined();
    expect(pirn.getQueries).toBeDefined();
  });
});

describe("Pirn client methods tests", () => {
  beforeEach(() => {
    pirn.removeClients(["source-client", "target-client", "client", "client1", "client2"]);
  });

  it("should add a client", () => {
    pirn.addClient(client);
    expect(pirn.dataClients).toEqual([client]);
    expect(pirn.dataSources).toEqual([client]);
  });
  it("should add clients", () => {
    pirn.addClients(clients);
    expect(pirn.dataClients).toEqual(clients);
    expect(pirn.dataSources).toEqual([clients[0]]);
    expect(pirn.dataTargets).toEqual([clients[1]]);
  });
  it("should remove a client", () => {
    pirn.addClient(client);
    pirn.removeClient("client");
    expect(pirn.dataClients).toEqual([]);
    expect(pirn.dataSources).toEqual([]);
  });
  it("should remove clients", () => {
    pirn.addClients(clients);
    pirn.removeClients(["client1", "client2"]);
    expect(pirn.dataClients).toEqual([]);
    expect(pirn.dataSources).toEqual([]);
    expect(pirn.dataTargets).toEqual([]);
  });
  it("should get a client", () => {
    pirn.addClient(client);
    expect(pirn.getClient("client")).toEqual(client);
  });
  it("should get clients", () => {
    pirn.addClients(clients);
    expect(pirn.getClients(["client1", "client2"])).toEqual(clients);
  });
});

describe("Pirn JSON dump path methods tests", () => {
  it("should set the JSON dump path", () => {
    pirn.setJSONDumpPath(JSONDumpPath);
    expect(pirn.JSONDumpPath).toEqual(JSONDumpPath);
  });
  it("should get the JSON dump path", () => {
    expect(pirn.getJSONDumpPath()).toEqual(pirn.JSONDumpPath);
  });
});

describe("Pirn query methods tests", () => {
  beforeEach(() => {
    pirn.removeQueries(["query"]);
  });
  it("should add a query", () => {
    pirn.addQuery(query);
    expect(pirn.queries).toEqual([query]);
  });
  it("should add queries", () => {
    pirn.addQueries([query]);
    expect(pirn.queries).toEqual([query]);
  });
  it("should remove a query", () => {
    pirn.addQuery(query);
    pirn.removeQuery("query");
    expect(pirn.queries).toEqual([]);
  });
  it("should remove queries", () => {
    pirn.addQueries([query]);
    pirn.removeQueries(["query"]);
    expect(pirn.queries).toEqual([]);
  });
  it("should get a query", () => {
    pirn.addQuery(query);
    expect(pirn.getQuery("query")).toEqual(query);
  });
  it("should get queries", () => {
    pirn.addQueries([query]);
    expect(pirn.getQueries(["query"])).toEqual([query]);
  });
});
