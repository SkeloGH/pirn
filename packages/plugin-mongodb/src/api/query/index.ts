import {
  IQuery,
} from "@pirn/types";

export default class QueryAPI {
  private queries: Set<IQuery> = new Set();

  public addQuery(query: IQuery):IQuery[] {
    this.queries.add(query);
    return this.getQueries();
  }

  public addQueries(queries: IQuery[]):IQuery[] {
    queries.forEach((query) => this.queries.add(query));
    return this.getQueries();
  }

  public getQueries(): IQuery[] {
    return Array.from(this.queries);
  }

  public getQuery(id: string): IQuery | undefined {
    return [...this.queries].find((query) => query.id === id);
  }

  public removeQuery(id: string): IQuery[] {
    this.queries.forEach((query) => {
      if (query.id === id) {
        this.queries.delete(query);
      }
    });
    return this.getQueries();
  }

  public removeQueries(ids: string[]): IQuery[] {
    ids.forEach((id) => this.removeQuery(id));
    return this.getQueries();
  }
}