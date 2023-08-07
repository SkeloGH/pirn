interface IDataClient {
  type: "source" | "target";
  origin?: IDataClient;
  db: {
    url: string;
    name: string;
    options?: object;
  };
  clientOptions?: {
    ignoreFields?: string[];
  }
}
interface IJsonConfig {
  filePath: string;
}
interface IQuery {
  type: string;
  body: unknown;
  options?: object;
}
interface IConfig {
  dataClients: IDataClient[];
  jsonConfig: IJsonConfig;
  queries: IQuery[];
}

export { IDataClient, IJsonConfig, IQuery, IConfig };
