import { IEmployee } from '@core';

import { createAction, props } from '@ngrx/store';

export const loadEmployees = createAction(
  '[Employee] Load Employees',
  props<{
    pageSize: number;
    lastKey: number;
    filter: any;
    whereObj: any;
    cols?: string[] | any;
    searchVal?: string | any;
    searchCols?: string[];
  }>()
);

export const loadEmployeesSuccess = createAction(
  '[Employee] Load Employees Success',
  props<{ employees: IEmployee[]; totalCount: number }>()
);

export const loadEmployeesFailed = createAction(
  '[Employee] Load Employees Failure',
  props<{ error: string }>()
);
