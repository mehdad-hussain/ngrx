import { Injectable } from '@angular/core';
// prettier-ignore
import { EntityAction, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, EntityOp, ofEntityOp, } from '@ngrx/data';

import { IEmployee } from '@core';
import { filter, map, Observable, Subject } from 'rxjs';

@Injectable()
export class EmployeeService extends EntityCollectionServiceBase<IEmployee> {
  // actions$ =
  //   this.entityActions$.pipe(
  //     filter(ofEntityOp('query-all')),
  //     map((action) => {
  //       console.log('action', action);
  //       return action;
  //     })
  //   );

  // error$ = this.entityActions$.pipe(
  //   ofEntityOp('query-all'),
  //   // filter((action) => action.error),
  //   // map((action) => action.payload),

  //   map((action) => {
  //     console.log('action', action);
  //     return action;
  //   })
  // );

  // todo: find out how to get error message from payload in ngrx-data

  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Employee', elementsFactory);

    this.errors$.pipe(
      filter(
        (ea: EntityAction) =>
          ea.payload.entityName === 'Employee' &&
          ea.payload.entityOp === EntityOp.QUERY_ALL_ERROR
      )
    );
    //   .subscribe(() =>
    //     this._addErrorSubject.next(
    //       "We couldn't save your changes at the moment. Please try again later."
    //     )
    //   );

    // this.error$.subscribe((error: any) => {
    //   console.log('error', error);
    // });

    // this.addError$.subscribe((error) => {
    //   console.log('error', error);
    // });
  }

  // private _addErrorSubject = new Subject<string>();

  // get addError$(): Observable<string> {
  //   console.log('addError$', this._addErrorSubject);
  //   return this._addErrorSubject;
  // }

  // ... your special sauce here
}
