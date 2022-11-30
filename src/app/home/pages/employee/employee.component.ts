import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// prettier-ignore
import { faSave,faPenToSquare, faEye, faTrash, faArrowUpWideShort, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';

// prettier-ignore
import { AppState, EmployeeService, loadedEmployees, loadEmployees, } from '@store';
import { PaginationService, TableService } from '@core';
import { ColumnType } from 'app/shared/components';

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
  myContext = { $implicit: 'World', localSk: 'Svet' };

  error: string | null = '';

  tableName: string = 'Employee Table';
  rows: any[] = [];
  columns: string[] = [];
  actions = [
    { name: 'Edit', icon: faPenToSquare },
    { name: 'View', icon: faEye },
    { name: 'Delete', icon: faTrash },
  ];
  pageSize: number = 2;
  maxPagesToDisplay: number = 10;

  faSpinner = faSpinner;

  qry = new FormControl('', []);
  options = new FormControl('', []);
  switch = new FormControl('', []);

  customColumns = [
    { name: 'permissions', index: 7, type: ColumnType.icon, icon: faSave },
    {
      name: 'price list',
      index: 6,
      type: ColumnType.link,
      url: '/admin/dashboard',
    },
    {
      name: 'details',
      index: 5,
      type: ColumnType.image,
      icon: faArrowUpWideShort,
    },
  ];

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
        // let columnDef = [ 'EmployeeId', 'FullName', 'Designation', 'ServiceLocation', 'ContactNumber', 'Gender', 'BranchName', 'Permissions'];
        this.columns = [
          'EmployeeId', 'FullName', 'Designation', 'ServiceLocation', 'ContactNumber', 'Gender', 'BranchName', 'Permissions'
        ];
        this.rows = res;
        let data;
        if (this.pageSize > res.length) {
          this.pageSize = res.length;
          data = res;
        } else {
          data = res.slice(0, this.pageSize);
        }

        this.pagination.setPaginationData(this.tableName, this.rows);
        // prettier-ignore
        this.table.setTable( this.tableName, data, this.columns, this.actions );
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
