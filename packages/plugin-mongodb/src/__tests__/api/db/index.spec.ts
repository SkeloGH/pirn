import { MongoClient, Db } from 'mongodb'
import { IQuery } from '@pirn/types';

import MongoDBClient from "../../../api";
import DatabaseAPI from "../../../api/db";
import {
  mockClientConfig,
  MOCK_QUERY_ID,
  LOCAL_MDB_URL,
  TEST_DB_NAME,
  MOCK_TABLE,
  MOCK_FIELD,
  MOCK_VALUE,
} from "../../__mock__";

describe("MongoDBClient.connect", () => {
  const _validClientConfig = {
    ...mockClientConfig,
    db: {
      ...mockClientConfig.db,
      host: LOCAL_MDB_URL,
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
        name: "unknown-db",
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

describe("MongoDBClient.fetch", () => {
  const _validClientConfig = {
    ...mockClientConfig,
    db: {
      ...mockClientConfig.db,
      host: LOCAL_MDB_URL,
    },
  };
  const client = new MongoDBClient(_validClientConfig);
  beforeAll(async () => {
    await client.connect();
  });
  afterAll(async () => {
    await client.disconnect();
  });
  it("should throw an error if no queries have been set", async () => {
    try {
      await client.fetch();
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("No queries found");
    }
  });
  it("should throw an error if no database connection", async () => {
    const _client = new MongoDBClient(_validClientConfig);
    _client.addQuery({
      id: MOCK_QUERY_ID,
      from: [MOCK_TABLE],
      where: {
        keys: [MOCK_FIELD],
        operator: "eq",
        value: MOCK_VALUE,
      },
    });
    try {
      await _client.fetch();
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("No database connection, have you called connect()?");
    }
  });
  it("should return empty array when no matching document is found", async () => {
    const query: IQuery = {
      id: MOCK_QUERY_ID,
      from: [MOCK_TABLE],
      where: {
        keys: [MOCK_FIELD],
        operator: "eq",
        value: MOCK_VALUE,
      },
    };
    client.addQuery(query);
    const results = await client.fetch();
    expect(results).toEqual([]);
  });
  it("should return results when matching document is found", async () => {
    const query: IQuery = {
      id: MOCK_QUERY_ID,
      from: [MOCK_TABLE],
      where: {
        keys: [MOCK_FIELD],
        operator: "eq",
        value: MOCK_VALUE,
      },
    };
    // Insert a document into the database
    const _client = new MongoClient(LOCAL_MDB_URL);
    await _client.connect();
    const db = _client.db(TEST_DB_NAME);
    const collection = db.collection(MOCK_TABLE);
    await collection.insertOne({ [MOCK_FIELD]: MOCK_VALUE });
    const inserted = await collection.find({ [MOCK_FIELD]: MOCK_VALUE }).toArray();
    // Fetch the document using the query
    client.addQuery(query);
    const results = await client.fetch();
    // Compare the results
    expect(results).toEqual(inserted);
    // Clean up
    await collection.deleteMany({});
    await _client.close();
  });
});

describe("DatabaseAPI.getOperator", () => {
  const db = new DatabaseAPI(mockClientConfig.db);
  it("should return $eq when operator is eq", () => {
    const operator = db.getOperator("eq");
    expect(operator).toEqual("$eq");
  });
  it("should return $in when operator is in", () => {
    const operator = db.getOperator("in");
    expect(operator).toEqual("$in");
  });
  it("should return $regex when operator is like", () => {
    const operator = db.getOperator("like");
    expect(operator).toEqual("$regex");
  });
  it("should return $eq when operator is null", () => {
    const operator = db.getOperator(null);
    expect(operator).toEqual("$eq");
  });
});
