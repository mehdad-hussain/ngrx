import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent, EmployeeComponent } from './pages';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared';
import { HomeComponent } from './home.component';
import { EmployeeDataService, EmployeeResolver, EmployeeService } from '@store';
import { LoadingProcessComponent } from '@assets';
@NgModule({
  declarations: [
    CustomerComponent,
    EmployeeComponent,
    HomeComponent,
    LoadingProcessComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  providers: [EmployeeService, EmployeeResolver, EmployeeDataService],
})
export class HomeModule {}
