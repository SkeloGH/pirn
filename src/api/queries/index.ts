import { IQuery } from 'interfaces';
import { spliceByKeyValue } from 'utils';

const queries: IQuery[] = [];

const addQuery = (query: IQuery) => queries.push(query);
const addQueries = (queries: IQuery[]) => queries.forEach(addQuery);
const removeQuery = (queryId: string) => spliceByKeyValue(queries, 'id', queryId);
const removeQueries = (queryIds: string[]) => queryIds.forEach(removeQuery);
const getQuery = (queryId: string) => queries.find(query => query.id === queryId);
const getQueries = (queryIds: string[]) => queryIds.map(getQuery);

export {
  queries,
  addQuery,
  addQueries,
  removeQuery,
  removeQueries,
  getQuery,
  getQueries,
};
