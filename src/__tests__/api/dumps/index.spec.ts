import Pirn from "api";
import { JSONDumpPath, config } from "__tests__/__mock__";

describe("Pirn JSON dump path methods tests", () => {
  
  const pirn = new Pirn(config);

  it("should set the JSON dump path", () => {
    pirn.setJSONDumpPath(JSONDumpPath);
    expect(pirn.JSONDumpPath).toEqual(JSONDumpPath);
  });
  it("should get the JSON dump path", () => {
    expect(pirn.getJSONDumpPath()).toEqual(pirn.JSONDumpPath);
  });
});
