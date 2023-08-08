import Pirn from "api";
import { sourceClient, targetClient, query, config } from "./__mock__";

const pirn = new Pirn(config);

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
