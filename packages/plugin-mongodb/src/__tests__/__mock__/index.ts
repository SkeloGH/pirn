import { IDataClientConfig, IQuery } from "@pirn/types";

export const LOCAL_MDB_URL = 'mongodb://localhost:27017';
export const TEST_DB_NAME = 'pirn-plugin-mongodb-test';
export const MOCK_QUERY_ID = 'mock-query-id';
export const MOCK_CLIENT_ID = 'mock-client-id';
export const MOCK_SOURCE_ID = 'mock-source-id';
export const MOCK_TABLE = 'mockTable';
export const MOCK_FIELD = 'mockField';
export const MOCK_VALUE = 'mock-value';
export const MOCK_IGNORE_FIELD = 'mock-ignore-field';
export const MOCK_IGNORE_TABLE = 'mock-ignore-table';

export const mockClientConfig: IDataClientConfig = {
  type: "target",
  clientId: MOCK_CLIENT_ID,
  sourceId: MOCK_SOURCE_ID,
  db: {
    host: "mock://url",
    name: TEST_DB_NAME,
    options: {
      serverSelectionTimeoutMS: 1000,
    }
  },
  options: {
    ignoreFields: [MOCK_IGNORE_FIELD],
    ignoreTables: [MOCK_IGNORE_TABLE],
  },
};

export const mockQuery: IQuery = {
  id: MOCK_QUERY_ID,
  clientId: MOCK_CLIENT_ID,
  from: [MOCK_TABLE],
  where: {
    keys: [MOCK_FIELD],
    operator: "eq",
    value: [MOCK_VALUE],
  },
};
