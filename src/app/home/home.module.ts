import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent, EmployeeComponent } from './pages';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [CustomerComponent, EmployeeComponent, HomeComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
