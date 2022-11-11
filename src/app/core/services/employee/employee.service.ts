import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(
    pageSize: number,
    lastKey: number,
    filter: string,
    whereObj: any,
    cols?: string[],
    searchVal?: string,
    searchCols?: string[]
  ) {
    return this.http.post<any>('admin/employeeList', {
      pageSize,
      lastKey,
      filter,
      whereObj,
      cols,
      searchVal,
      searchCols,
    });
  }
}
