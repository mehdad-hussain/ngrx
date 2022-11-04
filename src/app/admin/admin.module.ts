import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent, DashboardComponent, TodoComponent } from './pages';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared';
import { AdminComponent } from './admin.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    TodoComponent,
    AdminComponent,
    SignInComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
