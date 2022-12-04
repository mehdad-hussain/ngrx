import { createReducer, on } from '@ngrx/store';

import { IEmployee } from '@core';
import {
  loadEmployees,
  loadEmployeesSuccess,
  loadEmployeesFailed,
} from '@store';

export interface EmployeeState {
  employees: IEmployee[];
  loading: boolean;
  error: string;
  totalCount: number;
  status: 'pending' | 'loading' | 'failed' | 'success';
}

export const initialEmployeeState: EmployeeState = {
  employees: [],
  loading: false,
  error: '',
  totalCount: 0,
  status: 'pending',
};

export const employeeReducer = createReducer(
  initialEmployeeState,
  on(loadEmployees, (state) => {
    return {
      ...state,
      loading: true,
      status: 'loading',
    };
  }),

  on(loadEmployeesSuccess, (state, { employees, totalCount }) => {
    return {
      employees: employees,
      loading: false,
      error: '',
      totalCount: totalCount,
      status: 'success',
    };
  }),

  on(loadEmployeesFailed, (state, { error }) => {
    return {
      employees: [],
      loading: false,
      error: error,
      totalCount: 0,
      status: 'failed',
    };
  })
);
