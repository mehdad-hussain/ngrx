import { createReducer, on } from '@ngrx/store';

// prettier-ignore
import { addTodo, loadTodo, removeTodo, toggleTodo, editTodo, loadTodoSuccess, loadTodoFailure } from './todo.action';
import { Todo } from '@core';

export interface TodoState {
  todo: Todo[];
  loading: boolean;
  error: string;
  status: 'pending' | 'loading' | 'failed' | 'success';
}

export const initialState: TodoState = {
  todo: [],
  loading: false,
  error: '',
  status: 'pending',
};

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { content }) => {
    return {
      ...state,
      todo: [
        ...state.todo,
        { id: Date.now().toString(), content, completed: false },
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

  on(editTodo, (state, { id, content }) => {
    return {
      ...state,
      todo: state.todo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            content,
          };
        }
        return todo;
      }),
    };
  })
);
