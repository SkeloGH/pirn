import {
  config,
  client,
  clients
} from "__tests__/__mock__";
import Pirn from "api";

describe("Pirn client methods tests", () => {
  const pirn = new Pirn(config);
  beforeEach(() => {
    pirn.removeClients(["source-client", "target-client", "client", "client1", "client2"]);
  });

  it("should add a client", () => {
    pirn.addClient(client);
    expect(pirn.getClients()).toEqual([client]);
    expect(pirn.getSourceClients()).toEqual([client]);
  });
  it("should add clients", () => {
    pirn.addClients(clients);
    expect(pirn.getClients()).toEqual(clients);
    expect(pirn.getSourceClients()).toEqual([clients[0]]);
    expect(pirn.getTargetClients()).toEqual([clients[1]]);
  });
  it("should remove a client", () => {
    pirn.addClient(client);
    pirn.removeClient("client");
    expect(pirn.getClients()).toEqual([]);
    expect(pirn.getSourceClients()).toEqual([]);
  });
  it("should remove clients", () => {
    pirn.addClients(clients);
    pirn.removeClients(["source-client", "target-client"]);
    expect(pirn.getClients()).toEqual([]);
    expect(pirn.getSourceClients()).toEqual([]);
    expect(pirn.getTargetClients()).toEqual([]);
  });
  it("should get a client", () => {
    pirn.addClient(client);
    expect(pirn.getClient("client")).toEqual(client);
  });
  it("should get clients", () => {
    pirn.addClients(clients);
    expect(pirn.getClients(["source-client", "target-client"])).toEqual(clients);
  });
  it("should reset dataClients", () => {
    pirn.addClients(clients);
    pirn.resetDataClients();
    expect(pirn.getClients()).toEqual([]);
    expect(pirn.getSourceClients()).toEqual([]);
    expect(pirn.getTargetClients()).toEqual([]);
  });
});