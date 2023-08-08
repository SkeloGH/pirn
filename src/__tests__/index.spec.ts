import Pirn from "api";
import { sourceClient, targetClient, config } from "./__mock__";


describe("Pirn main class base tests", () => {
  const pirn = new Pirn(config);
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

describe("Pirn empty config tests", () => {
  const pirn = new Pirn();
  it("should not have JSONDumpPath", () => {
    expect(pirn.JSONDumpPath).toBeUndefined();
  });
  it("should not have queries", () => {
    expect(pirn.queries).toEqual([]);
  });
  it("should not have dataClients", () => {
    expect(pirn.dataClients).toEqual([]);
    expect(pirn.dataSources).toEqual([]);
    expect(pirn.dataTargets).toEqual([]);
  });
});
