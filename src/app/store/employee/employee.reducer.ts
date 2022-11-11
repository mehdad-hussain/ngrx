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
  status: 'pending' | 'loading' | 'failed' | 'success';
}

export const initialEmployeeState: EmployeeState = {
  employees: [],
  loading: false,
  error: '',
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

  on(loadEmployeesSuccess, (state, { employees }) => {
    return {
      employees: employees,
      loading: false,
      error: '',
      status: 'success',
    };
  }),

  on(loadEmployeesFailed, (state, { error }) => {
    return {
      employees: [],
      loading: false,
      error: error,
      status: 'failed',
    };
  })
);
