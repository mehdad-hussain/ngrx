import { AuthState, EmployeeState, TodoState } from '@store';

export interface AppState {
  todo: TodoState;
  auth: AuthState;
  employee: EmployeeState;
}
