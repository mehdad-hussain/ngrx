import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmployeeService } from '@store';

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

  constructor(
    private employeeService: EmployeeService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.payload$.subscribe((res) => {
      res?.error ? (this.error = res.error) : (this.error = null);
      console.log('error', this.error);
    });

    // this.employeeService.getAll();
  }
}
