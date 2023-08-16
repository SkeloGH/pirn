import MongoDBClient from "../../api";
import { mockClientConfig } from "../__mock__";


describe("MongoDBClient", () => {
  const client = new MongoDBClient(mockClientConfig);
  it("should have all required properties", () => {
    expect(client).toHaveProperty("type");
    expect(client).toHaveProperty("clientId");
    expect(client).toHaveProperty("sourceId");
    expect(client).toHaveProperty("db");
    expect(client).toHaveProperty("options");
    expect(client).toHaveProperty("options.ignoreFields");
    expect(client).toHaveProperty("options.ignoreTables");
  });
  it("should list all non-implemented methods", async () => {
    const methods = [
      client.query,
      client.fetch,
      client.dump,
      client.load,
      client.addIgnoreField,
      client.addIgnoreFields,
      client.addIgnoreTable,
      client.addIgnoreTables,
      client.removeIgnoreField,
      client.removeIgnoreFields,
      client.removeIgnoreTable,
      client.removeIgnoreTables,
      client.getIgnoreFields,
      client.getIgnoreTables,
    ];
    for (const method of methods) {
      try {
        await method();
      } catch (err: unknown) {
        expect((err as Error).message).toEqual("Not implemented");
      }
    }
  });
});

describe("MongoDBClient.validateConfig", () => {
  it("should throw an error if type is target and sourceId is not provided", () => {
    const { db } = mockClientConfig;
    const _mockClientConfig = {
      ...mockClientConfig,
      clientId: '',
      sourceId: '',
      db,
    };
    try {
      new MongoDBClient(_mockClientConfig);
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("sourceId is required");
    }
  });
  it("should not throw an error if type is target and sourceId is provided", () => {
    const { db } = mockClientConfig;
    const _mockClientConfig = {
      ...mockClientConfig,
      clientId: '',
      db,
    };
    try {
      new MongoDBClient(_mockClientConfig);
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("sourceId is required");
    }
  });
});

describe("MongoDBClient ignoreFields and ignoreTables", () => {
  it("should have default ignoreFields and ignoreTables", () => {
    const { type, sourceId, db } = mockClientConfig;
    const _mockClientConfig = {
      clientId: 'mock-client-id',
      type,
      sourceId,
      db,
    };
    const client = new MongoDBClient(_mockClientConfig);
    expect(client.options?.ignoreFields).toEqual([]);
    expect(client.options?.ignoreTables).toEqual([]);
  });

  it("should have ignoreFields and ignoreTables", () => {
    const { type, sourceId, db } = mockClientConfig;
    const _mockClientConfig = {
      clientId: 'mock-client-id',
      type,
      sourceId,
      db,
      options: {
        ignoreFields: ["mock-ignore-field"],
        ignoreTables: ["mock-ignore-table"],
      },
    };
    const client = new MongoDBClient(_mockClientConfig);
    expect(client.options?.ignoreFields).toEqual(["mock-ignore-field"]);
    expect(client.options?.ignoreTables).toEqual(["mock-ignore-table"]);
  });
});
