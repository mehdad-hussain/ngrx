import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, map, switchMap, exhaustMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService, IUser } from '@core';
// prettier-ignore
import { login, loginSuccess, loginFailed, logout, selectUser, AppState, } from '@store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap((action) =>
        this.authService
          .login(
            action.credentials.mobile,
            action.credentials.password,
            action.credentials.remember
          )
          .pipe(
            map((res) =>
              res.Success
                ? loginSuccess({ user: res.Data.user })
                : loginFailed({ error: res.Message })
            ),
            catchError((error) => of(loginFailed({ error })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ user }) => {
          console.log(user);
        })
      ),
    { dispatch: false }
  );

  loginFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailed),
        tap(({ error }) => {
          alert(`Login failed, ${error}`);
          console.log(error);
        })
      ),
    { dispatch: false }
  );

  // logout$ = createEffect(
  //     () =>
  //     this.actions$.pipe(
  //         ofType(logout),
  //         switchMap(() => this.authService.logout())
  //     ),
  //     { dispatch: false }
  // );
}
