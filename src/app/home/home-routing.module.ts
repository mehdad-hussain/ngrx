import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent, EmployeeComponent } from './pages';

const routes: Routes = [
  {
    path: 'home',
    children: [
      { path: 'employee', component: EmployeeComponent },
      { path: 'customer', component: CustomerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
