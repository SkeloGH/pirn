import Pirn from "api";
import QueriesAPI from "api/queries";
import { query, config } from "../../__mock__";
import MockDataClient from "../../__mock__/dataClient";


describe("Pirn query methods tests", () => {
  const pirn = new Pirn(config);
  const resetSuite = async () => {
    const client = new MockDataClient();
    const clients = pirn.getClients();
    const queries = pirn.getQueries();
    await pirn.removeClients(clients.map(client => client.clientId));
    pirn.removeQueries(queries.map(query => query.id));
    return pirn.addClient(client);
  };

  beforeEach(resetSuite);

  it("should add a query to a single client", () => {
    pirn.addQuery(query);
    expect(pirn.getQueries()).toEqual([query]);
  });
  it("should add a query to all clients", () => {
    const _query = { ...query };
    delete _query.clientId;

    pirn.addQuery(_query);
    const clientQueries = pirn.getClients().map(client => client.getQueries());
    expect(clientQueries[0]).toEqual([_query]);
  });
  it("should add queries", () => {
    pirn.addQueries([query]);
    expect(pirn.getQueries()).toEqual([query]);
  });
  it("should throw an error if a client is not found", () => {
    const _query = { ...query, clientId: "not-found" };
    expect(() => pirn.addQuery(_query)).toThrow(Error);
  });
  it("should remove a query", () => {
    pirn.addQuery(query);
    pirn.removeQuery("query");
    expect(pirn.getQueries()).toEqual([]);
  });
  it("should remove queries", () => {
    pirn.addQueries([query]);
    pirn.removeQueries(["query"]);
    expect(pirn.getQueries()).toEqual([]);
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

describe("Isolated QueryAPI methods tests", () => {
  it("should add a query", () => {
    const queriesAPI = new QueriesAPI();
    queriesAPI.addQuery(query);
    expect(queriesAPI.getQueries()).toEqual([query]);
  });
  it("should add queries", () => {
    const queriesAPI = new QueriesAPI();
    queriesAPI.addQueries([query]);
    expect(queriesAPI.getQueries()).toEqual([query]);
  });
  it("should remove queries", () => {
    const queriesAPI = new QueriesAPI();
    queriesAPI.addQueries([query]);
    queriesAPI.removeQueries(["query"]);
    expect(queriesAPI.getQueries()).toEqual([]);
  });
  it("should get a query", () => {
    const queriesAPI = new QueriesAPI();
    queriesAPI.addQueries([query]);
    expect(queriesAPI.getQuery("query")).toEqual(query);
  });
  it("should get queries", () => {
    const queriesAPI = new QueriesAPI();
    queriesAPI.addQueries([query]);
    expect(queriesAPI.getQueries(["query"])).toEqual([query]);
  });
});