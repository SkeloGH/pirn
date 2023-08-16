import MongoDBClient from "../../../api";
import { mockClientConfig, mockQuery } from "../../__mock__";

describe('MongoDBClient query', () => {
  const client = new MongoDBClient(mockClientConfig);

  beforeEach(() => {
    const queries = client.getQueries();
    for (const query of queries) {
      client.removeQuery(query.id);
    }
  });

  it('should add query to queries', () => {
    const queries = client.addQuery(mockQuery);
    expect(queries).toEqual([mockQuery]);
  });

  it('should add queries to queries', () => {
    const mockQuery1 = { ...mockQuery, id: 'mockQuery1' };
    const mockQuery2 = { ...mockQuery, id: 'mockQuery2' };
    const queries = client.addQueries([mockQuery1, mockQuery2]);
    expect(queries).toEqual([mockQuery1, mockQuery2]);
  });

  it('should get query from queries', () => {
    client.addQuery(mockQuery);
    const query = client.getQuery(mockQuery.id);
    expect(query).toEqual(mockQuery);
  });

  it('should remove query from queries', () => {
    const queries = client.removeQuery(mockQuery.id);
    expect(queries).toEqual([]);
  });

  it('should remove queries from queries', () => {
    const mockQuery1 = { ...mockQuery, id: 'mockQuery1' };
    const mockQuery2 = { ...mockQuery, id: 'mockQuery2' };
    client.addQueries([mockQuery1, mockQuery2]);
    const queries = client.removeQueries([mockQuery1.id, mockQuery2.id]);
    expect(queries).toEqual([]);
  });

});