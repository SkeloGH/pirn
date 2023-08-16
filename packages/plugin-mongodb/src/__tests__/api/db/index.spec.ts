import { Db } from 'mongodb'
import MongoDBClient from "../../../api";
import { mockClientConfig } from "../../__mock__";

describe("MongoDBClient.connect", () => {
  const _validClientConfig = {
    ...mockClientConfig,
    db: {
      ...mockClientConfig.db,
      host: "mongodb://localhost:27017",
    },
  };
  const client = new MongoDBClient(_validClientConfig);
  it("should connect to the database", async () => {
    const dbClient: Db = await client.connect();
    expect(dbClient.databaseName).toEqual(_validClientConfig.db.name);
    await client.disconnect();
  });
  it("should throw an error if connection fails", async () => {
    const unknownhost = 'unknownhost';
    const _mockClientConfig = {
      ...mockClientConfig,
      db: {
        name: "mock-db",
        host: `mongodb://${unknownhost}:27404`,
        options: {
          ...mockClientConfig.db.options,
        }
      },
    };
    const _client = new MongoDBClient(_mockClientConfig);
    try {
      await _client.connect();
    } catch (err: unknown) {
      expect((err as Error).message).toEqual(`getaddrinfo ENOTFOUND ${unknownhost}`);
    }
  }, 1500); // 1.5s timeout
});