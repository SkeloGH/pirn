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
  it("should connect a client", async () => {
    pirn.addClient(client);
    const connection = await pirn.connect(client.clientId);
    expect(connection).toEqual(undefined);
  });
  it("should connect all clients", async () => {
    pirn.addClients(clients);
    const connection = await pirn.connectAll();
    expect(connection).toEqual([undefined, undefined]);
  });
  it("should throw an error when connecting a client that doesn't exist", async () => {
    try {
      await pirn.connect("client");
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("Client client not found");
    }
  });
  it("should fetch all clients", async () => {
    pirn.addClients(clients);
    const fetch = await pirn.fetch();
    expect(fetch).toEqual([undefined, undefined]);
  });
  it("should dump all clients", async () => {
    pirn.addClients(clients);
    const dump = await pirn.dump();
    expect(dump).toEqual([undefined, undefined]);
  });
  it("should disconnect a client", async () => {
    pirn.addClient(client);
    const disconnect = await pirn.disconnect(client.clientId);
    expect(disconnect).toEqual(undefined);
  });
  it("should disconnect all clients", async () => {
    pirn.addClients(clients);
    const disconnect = await pirn.disconnectAll();
    expect(disconnect).toEqual([undefined, undefined]);
  });
});