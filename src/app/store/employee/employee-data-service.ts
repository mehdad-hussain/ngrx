import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// prettier-ignore
import { DefaultDataService, HttpUrlGenerator, Logger, QueryParams } from '@ngrx/data';

import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IApiResponse, IEmployee } from '@core';
@Injectable()
export class EmployeeDataService extends DefaultDataService<IEmployee> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store<any>,
    logger: Logger,
    actions$: Actions
  ) {
    super('', http, httpUrlGenerator);
    logger.log('Created custom Employee EntityDataService');
  }

  override getAll(): Observable<IEmployee[] | any> {
    return this.http
      .post<IApiResponse>('admin/employeeList', {
        pageSize: 10,
        lastKey: 0,
        filter: '',
        whereObj: {},
      })
      .pipe(
        map((res) => {
          const employees: any[] = [];
          if (res.Success) {
            res.Data.forEach((employee: IEmployee) => {
              employees.push(this.mapEmployee(employee));
            });
          } else {
            employees.push(res.Message);
            this.store.dispatch({
              type: '[Employee] @ngrx/data/query-all/error',
              payload: res.Message,
            });
          }
          return employees;
          // idea: here it is producing success all the time because it is not getting the error from the server as post response
        }),

        catchError((error) =>
          of(
            alert(
              'The server is not responding. Please try again later. If the problem persists, please contact the administrator.'
            ),

            this.store.dispatch({
              type: '[Employee] @ngrx/data/query-all/failure',
              payload: error.message,
            })
          )
        )
      );
  }

  override getById(id: string | number): Observable<IEmployee> {
    return super
      .getById(id)
      .pipe(map((employee) => this.mapEmployee(employee)));
  }

  override getWithQuery(params: any): Observable<IEmployee[] | any> {
    // return super
    //   .getWithQuery(params)
    //   .pipe(
    //     map((employees) =>
    //       employees.map((employee) => this.mapEmployee(employee))
    //     )
    //   );

    return this.http.post<IApiResponse>('admin/employeeList', params).pipe(
      map((res) => {
        const employees: any[] = [];
        if (res.Success) {
          res.Data.forEach((employee: IEmployee) => {
            employees.push(this.mapEmployee(employee));
          });
        } else {
          employees.push(res.Message);
          this.store.dispatch({
            type: '[Employee] @ngrx/data/query-all/error',
            payload: res.Message,
          });
        }
        return employees;
        // idea: here it is producing success all the time because it is not getting the error from the server as post response
      }),

      catchError((error) =>
        of(
          alert(
            'The server is not responding. Please try again later. If the problem persists, please contact the administrator.'
          ),

          this.store.dispatch({
            type: '[Employee] @ngrx/data/query-all/failure',
            payload: error.message,
          })
        )
      )
    );
  }

  private mapEmployee(employee: IEmployee): IEmployee {
    return { ...employee, CreatedAt: new Date().getTime() };
  }
}
