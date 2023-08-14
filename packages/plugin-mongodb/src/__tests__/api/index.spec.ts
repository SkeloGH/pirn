import { TClientType } from "@pirn/types";
import DataClient from "api";
const dataClientConfig = {
  type: "target" as TClientType,
  clientId: "mock-client-id",
  sourceId: "mock-source",
  db: {
    host: "mock://url",
    name: "mock-name",
    options: {
      port: 27017,
      user: "mock-user",
      password: "mock-password",
    },
  },
  options: {
    ignoreFields: ["mock-ignore-field"],
    ignoreTables: ["mock-ignore-table"],
  },
};
const dataClient = new DataClient(dataClientConfig);
describe("DataClient", () => {
  it("should have all required properties", () => {
    expect(dataClient).toHaveProperty("type");
    expect(dataClient).toHaveProperty("clientId");
    expect(dataClient).toHaveProperty("sourceId");
    expect(dataClient).toHaveProperty("db");
    expect(dataClient).toHaveProperty("options");
    expect(dataClient).toHaveProperty("options.ignoreFields");
    expect(dataClient).toHaveProperty("options.ignoreTables");
  });
  it("should have all required methods", async () => {
    const methods = [
      dataClient.connect,
      dataClient.disconnect,
      dataClient.query,
      dataClient.fetch,
      dataClient.dump,
      dataClient.load,
      dataClient.addQuery,
      dataClient.addQueries,
      dataClient.addIgnoreField,
      dataClient.addIgnoreFields,
      dataClient.addIgnoreTable,
      dataClient.addIgnoreTables,
      dataClient.removeQuery,
      dataClient.removeQueries,
      dataClient.removeIgnoreField,
      dataClient.removeIgnoreFields,
      dataClient.removeIgnoreTable,
      dataClient.removeIgnoreTables,
      dataClient.getQuery,
      dataClient.getQueries,
      dataClient.getIgnoreFields,
      dataClient.getIgnoreTables,
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

describe("DataClient.validateConfig", () => {
  it("should throw an error if type is target and sourceId is not provided", () => {
    const { db } = dataClientConfig;
    const _dataClientConfig = {
      ...dataClientConfig,
      clientId: '',
      sourceId: '',
      db,
    };
    try {
      new DataClient(_dataClientConfig);
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("sourceId is required");
    }
  });
  it("should not throw an error if type is target and sourceId is provided", () => {
    const { db } = dataClientConfig;
    const _dataClientConfig = {
      ...dataClientConfig,
      clientId: '',
      db,
    };
    try {
      new DataClient(_dataClientConfig);
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("sourceId is required");
    }
  });
});

describe("DataClient ignoreFields and ignoreTables", () => {
  it("should have default ignoreFields and ignoreTables", () => {
    const { type, sourceId, db } = dataClientConfig;
    const _dataClientConfig = {
      clientId: 'mock-client-id',
      type,
      sourceId,
      db,
    };
    const dataClient = new DataClient(_dataClientConfig);
    expect(dataClient.options?.ignoreFields).toEqual([]);
    expect(dataClient.options?.ignoreTables).toEqual([]);
  });

  it("should have ignoreFields and ignoreTables", () => {
    const { type, sourceId, db } = dataClientConfig;
    const _dataClientConfig = {
      clientId: 'mock-client-id',
      type,
      sourceId,
      db,
      options: {
        ignoreFields: ["mock-ignore-field"],
        ignoreTables: ["mock-ignore-table"],
      },
    };
    const dataClient = new DataClient(_dataClientConfig);
    expect(dataClient.options?.ignoreFields).toEqual(["mock-ignore-field"]);
    expect(dataClient.options?.ignoreTables).toEqual(["mock-ignore-table"]);
  });
});