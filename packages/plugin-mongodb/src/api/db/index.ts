import { MongoClient, MongoClientOptions, Db } from 'mongodb'
import { IDataClientDBConfig, IQuery, TQueryOperator } from '@pirn/types'


export default class DatabaseAPI {
  protected config: IDataClientDBConfig;
  protected host: string;
  protected name: string;
  protected options: MongoClientOptions;
  protected client: MongoClient | null;
  protected database: Db | null;

  constructor(config: IDataClientDBConfig) {
    this.config = config;
    this.host = config.host;
    this.name = config.name;
    this.options = config.options;
    this.client = null;
    this.database = null;
  }

  public connect = async (): Promise<Db> => {
    const connection = new MongoClient(this.host, this.options);
    this.client = await connection.connect();
    this.database = connection.db(this.name);
    return this.database;
  }

  public disconnect = async (): Promise<void> => {
    if (this.client) {
      await this.client.close(true);
    }
  }

  public getOperator = (operator: TQueryOperator | null): string => {
    switch (operator) {
      case "eq":
        return "$eq";
      case "in":
        return "$in";
      case "like":
        return "$regex"; // TODO validate when using regex
      default:
        return "$eq";
    }
  }


  public fetch = async (_query: IQuery): Promise<unknown[]> => {
    const NO_CONNECTION = 'No database connection, have you called connect()?';
    if (!this.database) return Promise.reject(new Error(NO_CONNECTION));
    const results: unknown[] = [];
    const db = this.database;
    const $op = this.getOperator(_query.where.operator);
    for (const collection of _query.from) {
      const col = db.collection(collection);
      for (const field of _query.where.keys) {
        const value = _query.where.value;
        const query = { [field]: { [$op]: value } };
        const result = await col.find(query).toArray();
        result.forEach((item) => results.push(item));
      }
    }
    return Promise.resolve(results);
  }
}
