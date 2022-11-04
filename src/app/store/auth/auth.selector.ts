import { createSelector } from '@ngrx/store';
import { AppState } from '@store';
import { AuthState } from './auth.reducer';

export const selectUser = (state: AppState) => state.user;

export const currentUser = createSelector(
  selectUser,
  (state: AuthState) => state.user
);
