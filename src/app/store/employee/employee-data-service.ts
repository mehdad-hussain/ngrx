import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// prettier-ignore
import { EntityCollectionDataService, DefaultDataService, HttpUrlGenerator, Logger, QueryParams } from '@ngrx/data';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse, IEmployee } from '@core';

@Injectable()
export class EmployeeDataService extends DefaultDataService<IEmployee> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger
  ) {
    super('Employee', http, httpUrlGenerator);
    logger.log('Created custom Employee EntityDataService');
  }

  override getAll(): Observable<IEmployee[]> {
    return this.http
      .post<IApiResponse>('admin/employeeList', {
        pageSize: 10,
        lastKey: 0,
        filter: '',
        whereObj: {},
      })
      .pipe(
        map((res) => {
          return res.Data;
        })
      );
  }

  override getById(id: string | number): Observable<IEmployee> {
    return super
      .getById(id)
      .pipe(map((employee) => this.mapEmployee(employee)));
  }

  override getWithQuery(params: string | QueryParams): Observable<IEmployee[]> {
    return super
      .getWithQuery(params)
      .pipe(
        map((employees) =>
          employees.map((employee) => this.mapEmployee(employee))
        )
      );
  }

  private mapEmployee(employee: IEmployee): IEmployee {
    return { ...employee, createdAt: new Date().getTime() };
  }
}
