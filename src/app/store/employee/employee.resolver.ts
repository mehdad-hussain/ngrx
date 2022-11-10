import { Injectable } from '@angular/core';
// prettier-ignore
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmployeeService } from '@store';
import { Observable, mergeMap, of, map, first, tap } from 'rxjs';

@Injectable()
export class EmployeeResolver implements Resolve<boolean> {
  constructor(
    private employeeService: EmployeeService,
    private store: Store<any>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.employeeService.loaded$.pipe(
      tap((loaded) => {
        let error: string | null = '';
        let payload$ = this.store.select(
          (state) => state.entityCache.Employee?.entities
        );
        payload$.subscribe((res) => {
          res?.error ? (error = res.error) : (error = null);
          if (error) {
            console.log('error', error);
          }
        });
        if (!loaded || error !== null) {
          this.employeeService.getAll();
        }
      }),
      first()
    );
  }
}
