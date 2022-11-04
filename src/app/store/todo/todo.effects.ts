import { Injectable } from '@angular/core';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

// prettier-ignore
import { AppState,addTodo, loadTodo, loadTodoFailure, loadTodoSuccess, removeTodo, selectAllTodo } from '@store';
import { ITodo, TodoService } from '@core';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private todoService: TodoService
  ) {}

  // @Effect()
  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodo),
      switchMap(() =>
        // Call the getTodos method, convert it to an observable
        from(this.todoService.getTodo()).pipe(
          // Take the returned value and return a new success action containing the todos
          map((todo: ITodo[]) => loadTodoSuccess({ todo })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadTodoFailure({ error })))
        )
      )
    )
  );

  // @Effect()
  addTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTodo, removeTodo),
        withLatestFrom(this.store.select(selectAllTodo)),
        switchMap(([action, todo]) => from(this.todoService.saveTodo(todo)))
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );
}
