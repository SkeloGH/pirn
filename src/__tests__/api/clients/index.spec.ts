import {
  config,
  client,
  clients
} from "__tests__/__mock__";
import Pirn from "api";


const pirn = new Pirn(config);


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
    pirn.removeClients(["source-client", "target-client"]);
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
    expect(pirn.getClients(["source-client", "target-client"])).toEqual(clients);
  });
});