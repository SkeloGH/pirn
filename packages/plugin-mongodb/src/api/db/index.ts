import { MongoClient, MongoClientOptions, Db } from 'mongodb'
import { IDataClientDBConfig } from '@pirn/types'

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
}