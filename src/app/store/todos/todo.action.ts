import { createAction, props } from '@ngrx/store';
import { Todo } from '../todo.model';

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ content: string }>()
);

export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ id: string }>()
);

export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: string }>()
);

export const editTodo = createAction(
  '[Todo] Edit Todo',
  props<{ id: string; content: string }>()
);

export const loadTodo = createAction('[Todo] Load Todo');

export const loadTodoSuccess = createAction(
  '[Todo] Load Todo Success',
  props<{ todo: Todo[] }>()
);

export const loadTodoFailure = createAction(
  '[Todo] Load Todo Failure',
  props<{ error: string }>()
);
