import { IDataClientConfig, IQuery } from "@pirn/types";

export const mockClientConfig: IDataClientConfig = {
  type: "target",
  clientId: "mock-client-id",
  sourceId: "mock-source",
  db: {
    host: "mock://url",
    name: "mock-name",
    options: {
      serverSelectionTimeoutMS: 1000,
    }
  },
  options: {
    ignoreFields: ["mock-ignore-field"],
    ignoreTables: ["mock-ignore-table"],
  },
};

export const mockQuery: IQuery = {
  id: "mock-query-id",
  clientId: "mock-client-id",
  from: ["mock-table"],
  where: {
    keys: ["mock-key"],
    operator: "eq",
    value: ["mock-value"],
  },
};
