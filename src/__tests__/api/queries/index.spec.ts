import Pirn from "api";
import { query, config } from "../../__mock__";

const pirn = new Pirn(config);

describe("Pirn query methods tests", () => {
  beforeEach(() => {
    pirn.removeQueries(["query"]);
  });
  it("should add a query", () => {
    pirn.addQuery(query);
    expect(pirn.getQueries()).toEqual([query]);
  });
  it("should add queries", () => {
    pirn.addQueries([query]);
    expect(pirn.getQueries()).toEqual([query]);
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
