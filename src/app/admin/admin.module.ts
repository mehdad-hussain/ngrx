import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent, DashboardComponent } from './pages';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [DashboardComponent, UsersComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
