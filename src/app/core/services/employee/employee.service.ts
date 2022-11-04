import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { IApiResponse } from '@core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getPublicData(
    pageSize: number,
    lastKey: number,
    type: string,
    filter: any,
    whereObj: any,
    orderBy?: any
  ) {
    return this.http
      .post<any>('public/list', {
        pageSize,
        lastKey,
        type,
        filter,
        whereObj,
        orderBy,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getEmployeeList(
    pageSize: number,
    lastKey: number,
    filter: any,
    whereObj: any
  ) {
    return this.http.post<any>('admin/employeeList', {
      pageSize,
      lastKey,
      filter,
      whereObj,
    });
  }
}
