import Pirn from "../../../api";
import QueriesAPI from "../../../api/queries";
import { query, config, clients } from "../../__mock__";
import MockDataClient from "../../__mock__/dataClient";
import { IQuery } from "@pirn/types";


describe("Pirn query methods tests", () => {
  const pirn = new Pirn(config);
  const resetSuite = async () => {
    const client = new MockDataClient();
    const clients = pirn.getClients();
    const queries = pirn.getQueries();
    await pirn.removeClients(clients.map(client => client.clientId));
    pirn.removeQueries(queries.map(query => query.id));
    return pirn.addClient(client);
  };

  beforeEach(resetSuite);

  it("should add a query to a single client", () => {
    pirn.addQuery(query);
    expect(pirn.getQueries()).toEqual([query]);
  });
  it("should call addQuery on all clients when no clientId is set", () => {
    const _query = { ...query };
    delete _query.clientId;
    pirn.addClients(clients);
    pirn.addQuery(_query);
    for (const client of pirn.getClients()) {
      expect(client.addQuery).toHaveBeenCalledWith(_query);
    }
  });
  it("should add queries", () => {
    pirn.addQueries([query]);
    expect(pirn.getQueries()).toEqual([query]);
  });
  it("should throw an error if a client is not found", () => {
    const _query = { ...query, clientId: "not-found" };
    expect(() => pirn.addQuery(_query)).toThrow(Error);
  });
  it("should remove a query", () => {
    pirn.addQuery(query);
    pirn.removeQuery("query");
    expect(pirn.getQueries()).toEqual([]);
  });
  it("should remove queries", () => {
    pirn.addQueries([query]);
    pirn.removeQueries(["query"]);
    expect(pirn.getQueries()).toEqual([]);
  });
  it("should get a query", () => {
    pirn.addQuery(query);
    expect(pirn.getQuery("query")).toEqual(query);
  });
  it("should get queries", () => {
    pirn.addQueries([query]);
    expect(pirn.getQueries(["query"])).toEqual([query]);
  });
});

describe("Isolated QueryAPI methods tests", () => {
  it("should add a query", () => {
    const queriesAPI = new QueriesAPI();
    queriesAPI.addQuery(query);
    expect(queriesAPI.getQueries()).toEqual([query]);
  });
  it("should add queries", () => {
    const queriesAPI = new QueriesAPI();
    queriesAPI.addQueries([query]);
    expect(queriesAPI.getQueries()).toEqual([query]);
  });
  it("should remove queries", () => {
    const queriesAPI = new QueriesAPI();
    queriesAPI.addQueries([query]);
    queriesAPI.removeQueries([query.id]);
    expect(queriesAPI.getQueries()).toEqual([]);
  });
  it("should get a query", () => {
    const queriesAPI = new QueriesAPI();
    queriesAPI.addQueries([query]);
    expect(queriesAPI.getQuery("query")).toEqual(query);
  });
  it("should get queries", () => {
    const queriesAPI = new QueriesAPI();
    queriesAPI.addQueries([query]);
    expect(queriesAPI.getQueries(["query"])).toEqual([query]);
  });
  it("should mark a query as invalid when value is empty object", () => {
    const queriesAPI = new QueriesAPI();
    const invalidQuery1: IQuery = {
      id: 'invalid-query',
      from: ['invalid-test'],
      where: {
        keys: ['invalid-key'],
        operator: 'in',
        value: {}
      }
    };

    queriesAPI.addQuery(invalidQuery1);
    expect(queriesAPI.getQueries()).toEqual([]);
  });
  it("should mark a query as invalid when value is empty array", () => {
    const queriesAPI = new QueriesAPI();
    const invalidQuery2: IQuery = {
      id: 'invalid-query',
      from: ['invalid-test'],
      where: {
        keys: ['invalid-key'],
        operator: 'in',
        value: []
      }
    };
    queriesAPI.addQuery(invalidQuery2);
    expect(queriesAPI.getQueries()).toEqual([]);
  });
  it("should mark a query as invalid when value is empty string", () => {
    const queriesAPI = new QueriesAPI();
    const invalidQuery3: IQuery = {
      id: 'invalid-query',
      from: ['invalid-test'],
      where: {
        keys: ['invalid-key'],
        operator: 'eq',
        value: ''
      }
    };
    queriesAPI.addQuery(invalidQuery3);
    expect(queriesAPI.getQueries()).toEqual([]);
  });
  it("should mark a query as invalid when keys is empty", () => {
    const queriesAPI = new QueriesAPI();
    const invalidQuery4: IQuery = {
      id: 'invalid-query',
      from: ['invalid-test'],
      where: {
        keys: [],
        operator: 'eq',
        value: 'any'
      }
    };
    queriesAPI.addQuery(invalidQuery4);
    expect(queriesAPI.getQueries()).toEqual([]);
  });
  it("should mark a query as invalid when from is empty", () => {
    const queriesAPI = new QueriesAPI();
    const invalidQuery5: IQuery = {
      id: 'invalid-query',
      from: [],
      where: {
        keys: [],
        operator: 'eq',
        value: 'any'
      }
    };
    queriesAPI.addQuery(invalidQuery5);
    expect(queriesAPI.getQueries()).toEqual([]);
  });
});