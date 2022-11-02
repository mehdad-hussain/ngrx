import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TodoState } from './todo.reducer';

export const selectTodoS = (state: AppState) => state.todoS;
export const selectAllTodoS = createSelector(
  selectTodoS,
  (state: TodoState) => state.todoS
);
