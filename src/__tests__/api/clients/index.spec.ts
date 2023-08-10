import {
  config,
  client,
  clients,
  query,
} from "__tests__/__mock__";
import Pirn from "api";

describe("Pirn clients CRUD tests", () => {
  const pirn = new Pirn(config);
  beforeEach(async () => {
    await pirn.removeClients(["source-client", "target-client", "client"]);
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
  it("should remove a client", async () => {
    pirn.addClient(client);
    await pirn.removeClient("client");
    expect(pirn.getClients()).toEqual([]);
    expect(pirn.getSourceClients()).toEqual([]);
  });
  it("should remove clients", async () => {
    pirn.addClients(clients);
    const result = await pirn.removeClients(["source-client", "target-client"]);
    expect(pirn.getClients()).toEqual([]);
    expect(pirn.getSourceClients()).toEqual([]);
    expect(pirn.getTargetClients()).toEqual([]);
    expect(result).toEqual([]);
  });
  it("should get a client", () => {
    pirn.addClient(client);
    expect(pirn.getClient("client")).toEqual(client);
  });
  it("should get clients", () => {
    pirn.addClients(clients);
    expect(pirn.getClients(["source-client", "target-client"])).toEqual(clients);
  });
  it("should reset dataClients", async () => {
    pirn.addClients(clients);
    await pirn.resetDataClients();
    expect(pirn.getClients()).toEqual([]);
    expect(pirn.getSourceClients()).toEqual([]);
    expect(pirn.getTargetClients()).toEqual([]);
  });
  it("should fetch all clients", async () => {
    pirn.addClients(clients);
    pirn.addQuery({
      ...query,
      clientId: "source-client",
    });
    const fetch = await pirn.fetch();
    expect(fetch).toEqual([undefined, undefined]);
  });
  it("should throw an error when fetching with no queries", async () => {
    const pirn = new Pirn();
    pirn.addClient(client);
    try {
      await pirn.fetch();
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("No queries found");
    }
  });
  it("should throw an error when fetching with no clients", async () => {
    const pirn = new Pirn();
    pirn.addClient(client);
    pirn.addQuery(query);
    await pirn.removeClient(client.clientId);
    try {
      await pirn.fetch();
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("No clients found");
    }
  });
});

describe("Client connection tests", () => {
  const pirn = new Pirn(config);
  beforeEach(async () => {
    await pirn.removeClients(["source-client", "target-client", "client"]);
  });
  it("should dump all clients", async () => {
    pirn.addClients(clients);
    await pirn.dump();
    for (const client of clients) {
      expect(client.dump).toHaveBeenCalled();
    }
  });
  it("should disconnect a client", async () => {
    pirn.addClient(client);
    const disconnect = await pirn.disconnect(client.clientId);
    expect(disconnect).toEqual(client);
  });
  it("should disconnect all clients", async () => {
    pirn.addClients(clients);
    const disconnect = await pirn.disconnectAll();
    expect(disconnect).toEqual(clients);
  });
  it("should throw an error when disconnecting a client that doesn't exist", async () => {
    try {
      await pirn.disconnect("client-unknown");
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("Client client-unknown not found");
    }
  });
  it("should connect a client", async () => {
    pirn.addClient(client);
    const connection = await pirn.connect(client.clientId);
    expect(connection).toEqual(client);
  });
  it("should connect all clients", async () => {
   pirn.addClients(clients);
    const connection = await pirn.connectAll();
    expect(connection).toEqual(clients);
  });
  it("should throw an error when connecting a client that doesn't exist", async () => {
    try {
      await pirn.connect("client");
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("Client client not found");
    }
  });
});

describe("Client dump tests", () => {
  const pirn = new Pirn(config);
  beforeEach(async () => {
    await pirn.removeClients(["source-client", "target-client", "client"]);
  });
  it("should dump all clients", async () => {
    pirn.addClients(clients);
    await pirn.dump();
    for (const client of clients) {
      expect(client.dump).toHaveBeenCalled();
    }
  });
});
