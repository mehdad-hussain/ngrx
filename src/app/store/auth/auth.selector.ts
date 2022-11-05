import { createSelector } from '@ngrx/store';
import { AppState } from '@store';
import { AuthState } from './auth.reducer';

export const selectUser = (state: AppState) => state.auth;

export const currentUser = createSelector(
  selectUser,
  (state: AuthState) => state.user
);

export const error = createSelector(
  selectUser,
  (state: AuthState) => state.error
);

export const signInStatus = createSelector(
  selectUser,
  (state: AuthState) => state.status
);
