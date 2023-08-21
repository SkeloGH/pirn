import Pirn from "../../api";
import { TQueryOperator } from "@pirn/types";

describe("Pirn main class base tests", () => {
  const pirn = new Pirn();
  it("should reject an invalid query", () => {
    const query = {
      id: "",
      from: [],
      where: {
        keys: [],
        operator: "eq" as TQueryOperator,
        value: [],
      }
    };
    try {
      pirn.addQuery(query);
    } catch (err: unknown) {
      expect((err as Error).message).toEqual("Invalid query");
    }
  });
});