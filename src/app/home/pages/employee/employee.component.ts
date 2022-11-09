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

  error: string = '';

  constructor(
    private employeeService: EmployeeService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    console.log(this.employeeList$.subscribe((res) => console.log(res)));

    console.log(
      this.payload$.subscribe((res) => {
        console.log('payload', res?.error);
        this.error = res?.error;
      })
    );

    this.employeeService.getAll();
  }
}
