import { TClientType } from "@pirn/types";

export const mockClientConfig = {
  type: "target" as TClientType,
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