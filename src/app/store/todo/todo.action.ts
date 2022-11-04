import { createAction, props } from '@ngrx/store';
import { ITodo } from '@core';

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ title: string }>()
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
  props<{ id: string; title: string }>()
);

export const loadTodo = createAction('[Todo] Load Todo');

export const loadTodoSuccess = createAction(
  '[Todo] Load Todo Success',
  props<{ todo: ITodo[] }>()
);

export const loadTodoFailure = createAction(
  '[Todo] Load Todo Failure',
  props<{ error: string }>()
);
