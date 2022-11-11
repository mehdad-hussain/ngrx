import { createSelector } from '@ngrx/store';
import { AppState, EmployeeState } from '@store';

export const selectEmployee = (state: AppState) => state.employee;

export const loadedEmployees = createSelector(
  selectEmployee,
  (state: EmployeeState) => state.employees
);

export const loadedEmployeesStatus = createSelector(
  selectEmployee,
  (state: EmployeeState) => state.status
);

export const loadedEmployeesError = createSelector(
  selectEmployee,
  (state: EmployeeState) => state.error
);
