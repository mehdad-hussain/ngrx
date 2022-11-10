import { EntityMetadataMap } from '@ngrx/data';

export const appEntityMetadata: EntityMetadataMap = {
  Employee: {
    selectId: (employee) =>
      employee.EmployeeId ? employee.EmployeeId : 'error',
    /* optional settings */

    // filterFn: nameFilter,
    // sortComparer: sortByName,
  },
  Villain: {
    // villainSelectId, // necessary if key is not `id`
    // selectId: (villain) => villain.key,

    /* optional settings */
    // entityName: 'Villain', // optional because same as map key
    // filterFn: nameAndSayingFilter,
    entityDispatcherOptions: { optimisticAdd: true, optimisticUpdate: true },
  },
  Theme: {},
};

export const pluralNames = { Employee: 'Employees', Villain: 'Villains' };

export const entityConfig = { entityMetadata: appEntityMetadata, pluralNames };
