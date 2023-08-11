import { IQuery } from '@pirn/types';
import { spliceByKeyValue } from 'utils';

class QueriesAPI {
  private queries: IQuery[] = [];

  public addQuery = (query: IQuery) => {
    this.queries.push(query);
    return this.queries;
  }
  public addQueries = (queries: IQuery[]) => {
    queries.forEach(this.addQuery);
    return this.queries;
  }
  public removeQuery = (queryId: string) => {
    spliceByKeyValue(this.queries, 'id', queryId);
    return this.queries;
  }
  public removeQueries = (queryIds: string[]) => {
    queryIds.forEach(this.removeQuery);
    return this.queries;
  }
  public getQuery = (queryId: string) => this.queries.find(query => query.id === queryId);
  public getQueries = (queryIds?: string[]) => {
    if (queryIds) {
      return this.queries.filter(query => queryIds.includes(query.id));
    }
    return this.queries;
  }
}

export default QueriesAPI;
