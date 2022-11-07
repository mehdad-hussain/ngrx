import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@store';
import { EmployeeService as ES } from '@core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {
  employeeList$ = this.employeeService.entities$;
  loaded$ = this.employeeService.loaded$;
  loading$ = this.employeeService.loading$;

  constructor(
    private employeeService: EmployeeService,
    private employeeS: ES
  ) {}

  ngOnInit(): void {
    // this.getEmployeeList();

    console.log(this.employeeList$.subscribe((res) => console.log(res)));

    console.log(this.loaded$.subscribe((res) => console.log(res)));

    this.employeeService.getAll();
  }

  // getEmployeeList() {
  //   this.employeeS.getEmployeeList(10, 0, '', {}).subscribe((res) => {
  //     console.log(res);
  //   });
  // }
}
