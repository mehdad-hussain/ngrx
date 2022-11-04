import { createReducer, on } from '@ngrx/store';

import { IUser } from '@core';
import { login, loginSuccess, loginFailed, logout } from './auth.action';

export interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string;
  status: 'pending' | 'loading' | 'failed' | 'success';
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: '',
  status: 'pending',
};

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state) => {
    return {
      ...state,
      loading: true,
      status: 'loading',
    };
  }),
  on(loginSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      loading: false,
      error: '',
      status: 'success',
    };
  }),
  on(loginFailed, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
      status: 'failed',
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);
