import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// prettier-ignore
import {   EntityAction,
  EntityCacheAction,EntityCollectionDataService,  OP_ERROR,
  OP_SUCCESS, DefaultDataService, HttpUrlGenerator, Logger, QueryParams, ofEntityOp } from '@ngrx/data';

import { Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

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

    // actions$
    //   .pipe(
    //     ofEntityOp(),
    //     filter(
    //       (ea: EntityAction) =>
    //         ea.payload.entityOp.endsWith(OP_SUCCESS) ||
    //         ea.payload.entityOp.endsWith(OP_ERROR)
    //     )
    //   )
    //   // this service never dies so no need to unsubscribe
    //   .subscribe((action) =>
    //     console.log(
    //       `${action.payload.entityName} action`,
    //       action.payload.entityOp
    //     )
    //   );

    // actions$
    //   .pipe(
    //     ofType(
    //       EntityCacheAction.SAVE_ENTITIES_SUCCESS,
    //       EntityCacheAction.SAVE_ENTITIES_ERROR
    //     )
    //   )
    //   .subscribe((action: any) =>
    //     console.log(
    //       `${action.type} - url: ${action.payload.url}`,
    //       'SaveEntities'
    //     )
    //   );
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
              type: '[Employee] @ngrx/data/query-all/failure',
              payload: res.Message,
            });
          }

          return employees;
        }),

        catchError((error) =>
          of(
            console.log(error.message),
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
    return { ...employee, CreatedAt: new Date().getTime() };
  }
}
