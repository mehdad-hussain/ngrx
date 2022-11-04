import { IUser } from '@core';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{
    credentials: { mobile: string; password: string; remember: boolean };
  }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: IUser }>()
);

export const loginFailed = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
