import {  IIgnoreField, IIgnoreTable } from 'interfaces';
const ignoreFields: IIgnoreField[] = [];
const ignoreTables: IIgnoreTable[] = [];

// Field methods
const addIgnoreField = (clientId: string, field: string) => {
  ignoreFields.push({ clientId, field });
  return ignoreFields;
};
const addIgnoreFields = (clientId: string, fields: string[]) => {
  fields.forEach(field => addIgnoreField(clientId, field));
  return ignoreFields;
}
const removeIgnoreField = (clientId: string, field: string) => {
  ignoreFields.splice(ignoreFields.findIndex(_ => _.clientId === clientId && _.field === field), 1);
  return ignoreFields;
};
const removeIgnoreFields = (clientId: string, fields: string[]) => {
  fields.forEach(field => removeIgnoreField(clientId, field));
  return ignoreFields;
};
const getIgnoreFields = (clientId?: string) => {
  if (!clientId) return ignoreFields;
  return ignoreFields.filter(_ => _.clientId === clientId);
}

// Table methods
const addIgnoreTable = (clientId: string, table: string) => {
  ignoreTables.push({ clientId, table });
  return ignoreTables;
};
const addIgnoreTables = (clientId: string, tables: string[]) => {
  tables.forEach(table => addIgnoreTable(clientId, table));
  return ignoreTables;
};
const removeIgnoreTable = (clientId: string, table: string) => {
  ignoreTables.splice(ignoreTables.findIndex(_ => _.clientId === clientId && _.table === table), 1);
  return ignoreTables;
};
const removeIgnoreTables = (clientId: string, tables: string[]) => {
  tables.forEach(table => removeIgnoreTable(clientId, table));
  return ignoreTables;
};
const getIgnoreTables = (clientId?: string) => {
  if (!clientId) return ignoreTables;
  return ignoreTables.filter(_ => _.clientId === clientId);
};

export {
  addIgnoreField,
  addIgnoreFields,
  removeIgnoreField,
  removeIgnoreFields,
  getIgnoreFields,
  addIgnoreTable,
  addIgnoreTables,
  removeIgnoreTable,
  removeIgnoreTables,
  getIgnoreTables
};
