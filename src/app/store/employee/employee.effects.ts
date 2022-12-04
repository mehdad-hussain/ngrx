import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap, exhaustMap, tap, from } from 'rxjs';
import { Store } from '@ngrx/store';

import { EmployeeService } from '@core';
// prettier-ignore
import {  AppState, loadEmployees, loadEmployeesSuccess, loadEmployeesFailed } from '@store';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private store: Store<AppState>
  ) {}

  // section: Get all employees

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      exhaustMap((action) =>
        from(
          this.employeeService.getEmployees(
            action.pageSize,
            action.lastKey,
            action.filter,
            action.whereObj,
            action.cols,
            action.searchVal,
            action.searchCols
          )
        ).pipe(
          map((res) =>
            res.Success
              ? loadEmployeesSuccess({
                  employees: res.Data,
                  totalCount: res.TotalCount,
                })
              : loadEmployeesFailed({ error: res.Message })
          ),
          catchError((error) => of(loadEmployeesFailed({ error })))
        )
      )
    )
  );

  loadEmployeesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadEmployeesSuccess),
        tap(({ employees }) => {
          console.log(employees);
        })
      ),
    { dispatch: false }
  );

  loadEmployeesFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadEmployeesFailed),
        tap(({ error }) => {
          console.log(error);
        })
      ),
    { dispatch: false }
  );
}
