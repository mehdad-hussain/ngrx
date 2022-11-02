import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent, DashboardComponent, TodosComponent } from './pages';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    TodosComponent,
    AdminComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
