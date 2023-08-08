import Pirn from "api";
import {
  config,
  ignoreField,
  ignoreFields,
  ignoreTable,
  ignoreTables,
} from "../../__mock__";

const pirn = new Pirn(config);

describe("Pirn ignore fields tests", () => {
  beforeEach(() => {
    const ignoreFields = pirn.getIgnoreFields();
    for (const ignoreField of ignoreFields) {
      pirn.removeIgnoreField(ignoreField.clientId, ignoreField.field);
    }
  });
  it("should add an ignore field", () => {
    pirn.addIgnoreField(ignoreField.clientId, ignoreField.field);
    expect(pirn.ignoreFields).toEqual([ignoreField]);
  });
  it("should add ignore fields", () => {
    pirn.addIgnoreFields(ignoreField.clientId, [ignoreField.field]);
    expect(pirn.ignoreFields).toEqual(ignoreFields);
  });
  it("should remove an ignore field", () => {
    pirn.addIgnoreField(ignoreField.clientId, ignoreField.field);
    pirn.removeIgnoreField(ignoreField.clientId, ignoreField.field);
    expect(pirn.ignoreFields).toEqual([]);
  });
  it("should remove ignore fields", () => {
    pirn.addIgnoreField(ignoreField.clientId, ignoreField.field);
    pirn.removeIgnoreFields(ignoreField.clientId, [ignoreField.field]);
    expect(pirn.ignoreFields).toEqual([]);
  });
  it("should get ignore fields", () => {
    pirn.addIgnoreFields(ignoreField.clientId, [ignoreField.field]);
    expect(pirn.getIgnoreFields(ignoreField.clientId)).toEqual(ignoreFields);
  });
});

describe("Pirn ignore tables tests", () => {
  beforeEach(() => {
    const ignoreTables = pirn.getIgnoreTables();
    for (const ignoreTable of ignoreTables) {
      pirn.removeIgnoreTable(ignoreTable.clientId, ignoreTable.table);
    }
  });
  it("should add an ignore table", () => {
    pirn.addIgnoreTable(ignoreTable.clientId, ignoreTable.table);
    expect(pirn.ignoreTables).toEqual([ignoreTable]);
  });
  it("should add ignore tables", () => {
    pirn.addIgnoreTables(ignoreTable.clientId, [ignoreTable.table]);
    expect(pirn.ignoreTables).toEqual(ignoreTables);
  });
  it("should remove an ignore table", () => {
    pirn.addIgnoreTable(ignoreTable.clientId, ignoreTable.table);
    pirn.removeIgnoreTable(ignoreTable.clientId, ignoreTable.table);
    expect(pirn.ignoreTables).toEqual([]);
  });
  it("should remove ignore tables", () => {
    pirn.addIgnoreTable(ignoreTable.clientId, ignoreTable.table);
    pirn.removeIgnoreTables(ignoreTable.clientId, [ignoreTable.table]);
    expect(pirn.ignoreTables).toEqual([]);
  });
  it("should get ignore tables", () => {
    pirn.addIgnoreTables(ignoreTable.clientId, [ignoreTable.table]);
    expect(pirn.getIgnoreTables(ignoreTable.clientId)).toEqual(ignoreTables);
  });
});
