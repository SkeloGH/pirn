import { spliceByKeyValue } from "../../utils";

describe("utils tests", () => {
  it("should splice by key value", () => {
    const source = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const result = spliceByKeyValue(source, "id", "2");
    expect(result).toEqual([{ id: "1" }, { id: "3" }]);
  });
});
