import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  // templateUrl: './admin.component.html',
  template: `<app-header></app-header>

    <router-outlet></router-outlet>

    <app-footer></app-footer> `,
  // styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {}
