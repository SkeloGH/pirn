import Pirn from "api";
import { sourceClient, targetClient, config } from "./__mock__";


describe("Pirn main class base tests", () => {
  const pirn = new Pirn(config);
  it("should have the class properties", () => {
    expect(pirn.getClients()).toEqual(config.dataClients);
    expect(pirn.getSourceClients()).toEqual([sourceClient]);
    expect(pirn.getTargetClients()).toEqual([targetClient]);
    expect(pirn.getJSONDumpPath()).toEqual(config.JSONDumpPath);
    expect(pirn.getQueries()).toEqual(config.queries);
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
    expect(pirn.getJSONDumpPath()).toBeUndefined();
  });
  it("should not have queries", () => {
    expect(pirn.getQueries()).toEqual([]);
  });
  it("should not have dataClients", () => {
    expect(pirn.getClients()).toEqual([]);
  });
});
