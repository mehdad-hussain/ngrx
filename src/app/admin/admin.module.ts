import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent, DashboardComponent } from './pages';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared';
import { TodosComponent } from './pages/todos/todos.component';

@NgModule({
  declarations: [DashboardComponent, UsersComponent, TodosComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
