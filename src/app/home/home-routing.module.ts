import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent, EmployeeComponent } from './pages';
import { HomeComponent } from './home.component';
import { EmployeeResolver } from '@store';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'employee',
        component: EmployeeComponent,
        resolve: { employees: EmployeeResolver },
      },
      { path: 'customer', component: CustomerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
