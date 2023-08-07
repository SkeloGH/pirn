import { IDataClient, IConfig } from "../interfaces";
import { Pirn, filterByType } from "../";

describe("Pirn main class base tests", () => {
  const sourceClient:IDataClient = {
    type: "source",
    db: {
      url: "",
      name: "",
    },
  };
  const targetClient:IDataClient = {
    type: "target",
    db: {
      url: "",
      name: "",
    },
  };
  const config:IConfig = {
    dataClients: [sourceClient, targetClient],
    jsonConfig: {
      filePath: "",
    },
    queries: [],
  };
  const pirn = new Pirn(config);
  test('should set properties from config', () => {
    expect(pirn.jsonConfig).toBeDefined()
    expect(pirn.dataClients).toBe(config.dataClients);
    expect(pirn.jsonConfig).toBe(config.jsonConfig);
    expect(pirn.queries).toBeDefined();
  });
  test("should return a function that returns true when passed a source client", () => {
    expect(filterByType("source")(sourceClient)).toBe(true)
  });
});
