import { Injectable } from '@angular/core';
// prettier-ignore
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, } from '@ngrx/data';

import { IEmployee, IList } from '@core';

@Injectable()
export class EmployeeService extends EntityCollectionServiceBase<IEmployee> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Employee', elementsFactory);
  }

  // ... your special sauce here
}
