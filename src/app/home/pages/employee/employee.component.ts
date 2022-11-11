import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { EmployeeService } from '@store';
import { PaginationService, TableService } from '@core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  pageSize: number = 3;
  maxPagesToDisplay: number = 10;

  faSpinner = faSpinner;

  qry = new FormControl('', []);
  options = new FormControl('', []);

  productDataArray = [
    {
      label: 'Search',
      control: this.qry,
      inputType: 'text',
      placeHolder: 'Search by name, contact',
    },
    {
      label: 'Status',
      control: this.options,
      inputType: 'text',
      placeHolder: 'Select user',
      dropdownOptions: [
        {
          id: 1,
          label: 'All',
        },
        {
          id: 2,
          label: 'Active',
        },
        {
          id: 3,
          label: 'Inactive',
        },
      ],
    },
  ];

  productForm = new FormGroup({
    qry: this.qry,
    options: this.options,
  });

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

  dropdownValueChanged(event: any) {
    console.log(event);
  }

  filter() {
    console.log(this.productForm.value);
  }
}
