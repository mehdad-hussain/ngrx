import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface ITable {
  id: string;
  rows: any[];
  columns: string[] | undefined;
  actions: string[] | undefined;
}

@Injectable({
  providedIn: 'root',
  // idea: we don't need to define providers for this service, as we are using providedIn: 'root', which means that this service will be available in the entire application
})
export class TableService {
  private tables: ITable[] = [];

  private changeTableData = new Subject<any[]>();

  changeTableData$ = this.changeTableData.asObservable();

  constructor() {}

  setTable(id: string, rows: any[], columns?: string[], actions?: string[]) {
    this.tables.push({
      id,
      rows,
      columns,
      actions,
    });
  }

  changeTableRows(id: string, row: any[]) {
    this.tables.map((table) => {
      table.id === id ? this.changeTableData.next(row) : table;
    });
  }

  getTableData = (id: string) => {
    const table = this.tables.find((table) => table.id === id);
    return table;
  };

  unregister(id: string) {
    this.tables = this.tables.filter((table) => table.id !== id);
  }
}
