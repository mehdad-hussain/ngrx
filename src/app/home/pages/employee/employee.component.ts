import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import {
  AppState,
  EmployeeService,
  loadedEmployees,
  loadEmployees,
} from '@store';
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
  // payload$ = this.store.select((state) => state.entityCache.Employee?.entities);
  employees$ = this.store.select(loadedEmployees);

  error: string | null = '';

  tableName: string = 'Employee Table';
  rows: any[] = [];
  columns: string[] = [];
  actions = ['Edit', 'View', 'Delete'];
  pageSize: number = 4;
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
          id: null,
          label: 'All',
        },
        {
          id: 1,
          label: 'Active',
        },
        {
          id: 0,
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
    private store: Store<AppState>,
    public table: TableService,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    // this.payload$.subscribe((res) => {
    //   res?.error ? (this.error = res.error) : (this.error = null);
    //   if (this.error) {
    //     console.log('error', this.error);
    //   }
    // });

    // this.employeeService.getAll();
    this.employeeList$.subscribe((res) => {
      console.log('res', res);
      if (res.length) {
        // prettier-ignore
        this.columns = [ 'employee id', 'name', 'designation', 'service location', 'contact number', 'gender', 'branch name', 'permissions', ];
        // prettier-ignore
        res.map((item) => { this.rows.push([ item.EmployeeId, item.FullName, item.Designation, item.ServiceLocation, item.ContactNumber, item.Gender, item.BranchName, item.Permissions ]); });
        let data: any[];

        if (this.pageSize > res.length) {
          this.pageSize = res.length;
          data = res;
        } else {
          data = res.slice(0, this.pageSize);
        }

        let tempData = [...data];
        console.log('tempData', tempData);

        data = [];

        tempData.map((item) => {
          data.push([
            item.EmployeeId,
            item.FullName,
            item.Designation,
            item.ServiceLocation,
            item.ContactNumber,
            item.Gender,
            item.BranchName,
            item.Permissions,
          ]);
        });

        this.pagination.setPaginationData(this.tableName, this.rows);
        this.table.setTable(this.tableName, data, this.columns, this.actions);
      }
    });

    this.employees$.subscribe((res) => {
      console.log('employees', res);
    });
  }

  dropdownValueChanged(event: any) {
    console.log(event);
  }

  filter() {
    let whereObj: any = {};
    if (this.productForm.value.options !== '') {
      whereObj.IsActive = this.productForm.value.options === 'Active' ? 1 : 0;
    }
    this.store.dispatch(
      loadEmployees({
        pageSize: this.pageSize,
        lastKey: 0,
        filter: '',
        whereObj: whereObj,
        cols: null,
        searchVal: this.productForm.value.qry,
        searchCols: ['FullName', 'ContactNumber'],
      })
    );
  }
}
