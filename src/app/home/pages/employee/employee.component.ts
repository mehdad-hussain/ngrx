import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // this.getPublicData();
    this.getEmployeeList();
  }

  // getPublicData() {
  //   this.employeeService
  //     .getPublicData(10, 0, 'Product', '', {})
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }

  getEmployeeList() {
    this.employeeService.getEmployeeList(10, 0, '', {}).subscribe((res) => {
      console.log(res);
    });
  }
}
