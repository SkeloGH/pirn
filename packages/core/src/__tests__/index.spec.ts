import Pirn from "../api";
import { sourceClient, targetClient, config } from "./__mock__";


describe("Pirn main class base tests", () => {
  const pirn = new Pirn(config);
  it("should apply configuration", () => {
    expect(pirn.getClients()).toEqual(config.dataClients);
    expect(pirn.getSourceClients()).toEqual([sourceClient]);
    expect(pirn.getTargetClients()).toEqual([targetClient]);
    expect(pirn.getJSONDumpPath()).toEqual(config.JSONDumpPath);
    expect(pirn.getQueries()).toEqual(config.queries);
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
