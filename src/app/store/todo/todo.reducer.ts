import { createReducer, on } from '@ngrx/store';

// prettier-ignore
import { addTodo, loadTodo, removeTodo, toggleTodo, editTodo, loadTodoSuccess, loadTodoFailure } from './todo.action';
import { ITodo } from '@core';

export interface TodoState {
  todo: ITodo[];
  loading: boolean;
  error: string;
  status: 'pending' | 'loading' | 'failed' | 'success';
}

export const initialTodoState: TodoState = {
  todo: [],
  loading: false,
  error: '',
  status: 'pending',
};

export const todoReducer = createReducer(
  initialTodoState,
  on(addTodo, (state, { title }) => {
    return {
      ...state,
      todo: [
        ...state.todo,
        { id: Date.now().toString(), title, completed: false },
      ],
    };
  }),

  on(removeTodo, (state, { id }) => {
    return {
      ...state,
      todo: state.todo.filter((todo) => todo.id !== id),
    };
  }),

  on(loadTodo, (state) => {
    return {
      ...state,
      loading: true,
      status: 'loading',
    };
  }),

  on(loadTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      todo: todo,
      loading: false,
      error: '',
      status: 'success',
    };
  }),

  on(loadTodoFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
      status: 'failed',
    };
  }),

  on(toggleTodo, (state, { id }) => {
    return {
      ...state,
      todo: state.todo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    };
  }),

  on(editTodo, (state, { id, title }) => {
    return {
      ...state,
      todo: state.todo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
          };
        }
        return todo;
      }),
    };
  })
);
