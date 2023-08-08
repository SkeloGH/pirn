interface IDataClient {
  type: "source" | "target";
  origin?: IDataClient;
  clientId: string;
  db: {
    url: string;
    name: string;
    options?: object;
  };
  clientOptions?: {
    ignoreFields?: string[];
  }
}
interface IQuery {
  id?: string;
  clientId?: string;
  from: string[];
  where: string | {
    keys: string[];
    operator: "eq" | "like" | "in";
    value: string | string[] | object | object[];
  };
}
interface IConfig {
  dataClients?: IDataClient[];
  JSONDumpPath?: string;
  queries?: IQuery[];
}

interface IIgnoreField {
  clientId: string;
  field: string;
}
interface IIgnoreTable {
  clientId: string;
  table: string;
}

export { IDataClient, IQuery, IConfig, IIgnoreField, IIgnoreTable };
