import { AuthState, TodoState } from '@store';

export interface AppState {
  todo: TodoState;
  user: AuthState;
}
