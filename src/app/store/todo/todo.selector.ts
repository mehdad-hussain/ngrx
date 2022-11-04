import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TodoState } from './todo.reducer';

export const selectTodo = (state: AppState) => state.todo;
export const selectAllTodo = createSelector(
  selectTodo,
  (state: TodoState) => state.todo
);
