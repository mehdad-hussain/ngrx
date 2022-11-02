import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent, EmployeeComponent } from './pages';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [CustomerComponent, EmployeeComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
