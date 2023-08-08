import {  IIgnoreField, IIgnoreTable } from 'interfaces';

class IgnoresAPI {
  private ignoreFields: IIgnoreField[] = [];
  private ignoreTables: IIgnoreTable[] = [];
  
  // Field methods
  public addIgnoreField = (clientId: string, field: string) => {
    this.ignoreFields.push({ clientId, field });
    return this.ignoreFields;
  };
  public addIgnoreFields = (clientId: string, fields: string[]) => {
    fields.forEach(field => this.addIgnoreField(clientId, field));
    return this.ignoreFields;
  }
  public removeIgnoreField = (clientId: string, field: string) => {
    this.ignoreFields.splice(
      this.ignoreFields.findIndex(_ => _.clientId === clientId && _.field === field), 1);
    return this.ignoreFields;
  };
  public removeIgnoreFields = (clientId: string, fields: string[]) => {
    fields.forEach(field => this.removeIgnoreField(clientId, field));
    return this.ignoreFields;
  };
  public getIgnoreFields = (clientId?: string) => {
    if (!clientId) return this.ignoreFields;
    return this.ignoreFields.filter(_ => _.clientId === clientId);
  }
  
  // Table methods
  public addIgnoreTable = (clientId: string, table: string) => {
    this.ignoreTables.push({ clientId, table });
    return this.ignoreTables;
  };
  public addIgnoreTables = (clientId: string, tables: string[]) => {
    tables.forEach(table => this.addIgnoreTable(clientId, table));
    return this.ignoreTables;
  };
  public removeIgnoreTable = (clientId: string, table: string) => {
    this.ignoreTables.splice(
      this.ignoreTables.findIndex(_ => _.clientId === clientId && _.table === table), 1);
    return this.ignoreTables;
  };
  public removeIgnoreTables = (clientId: string, tables: string[]) => {
    tables.forEach(table => this.removeIgnoreTable(clientId, table));
    return this.ignoreTables;
  };
  public getIgnoreTables = (clientId?: string) => {
    if (!clientId) return this.ignoreTables;
    return this.ignoreTables.filter(_ => _.clientId === clientId);
  };
}



export default IgnoresAPI;
