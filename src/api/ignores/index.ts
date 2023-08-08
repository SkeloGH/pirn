import {  IIgnoreField } from 'interfaces';
const ignoreFields: IIgnoreField[] = [];

const addIgnoreField = (clientId: string, field: string) => ignoreFields.push({ clientId, field });
const addIgnoreFields = (clientId: string, fields: string[]) => {
  fields.forEach(field => addIgnoreField(clientId, field));
}
const removeIgnoreField = (clientId: string, field: string) => {
  ignoreFields.splice(ignoreFields.findIndex(_ => _.clientId === clientId && _.field === field), 1);
};
const getIgnoreFields = (clientId: string) => ignoreFields.filter(_ => _.clientId === clientId);

export {
  addIgnoreField,
  addIgnoreFields,
  removeIgnoreField,
  getIgnoreFields,
};
