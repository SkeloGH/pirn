import { IQuery } from '@pirn/types';
import { spliceByKeyValue } from '../../utils';

class QueriesAPI {
  private queries: IQuery[] = [];

  private isValidQuery = (query: IQuery): boolean => {
    if (!query.from.length) return false;
    if (!query.where.keys.length) return false;
    if (!query.where.value) return false;
    if (Array.isArray(query.where.value)) {
      if (query.where.value.length < 1) return false;
    }
    if (typeof query.where.value === 'object') {
      if (!Object.keys(query.where.value).length) return false;
    }
    return true;
  }

  public addQuery = (query: IQuery) => {
    if (!this.isValidQuery(query)) return this.queries;
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
