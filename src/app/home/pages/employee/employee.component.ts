import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { EmployeeService } from '@store';
import { PaginationService, TableService } from '@core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {
  employeeList$ = this.employeeService.entities$;
  loading$ = this.employeeService.loading$;
  payload$ = this.store.select((state) => state.entityCache.Employee?.entities);

  error: string | null = '';

  tableName: string = 'Employee Table';
  rows: any[] = [];
  columns: string[] = [];
  actions = ['Edit', 'View', 'Delete'];
  pageSize: number = 1;
  maxPagesToDisplay: number = 10;

  faSpinner = faSpinner;

  constructor(
    private employeeService: EmployeeService,
    private store: Store<any>,
    public table: TableService,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.payload$.subscribe((res) => {
      res?.error ? (this.error = res.error) : (this.error = null);
      if (this.error) {
        console.log('error', this.error);
      }
    });

    // this.employeeService.getAll();
    this.employeeList$.subscribe((res) => {
      if (res.length) {
        this.columns = Object.keys(res[0]);
        this.rows = res;
        let data;
        if (this.pageSize > res.length) {
          this.pageSize = res.length;
          data = res;
        } else {
          data = res.slice(0, this.pageSize);
        }
        this.pagination.setPaginationData(this.tableName, this.rows);
        this.table.setTable(this.tableName, data, this.columns, this.actions);
      }
    });
  }
}
