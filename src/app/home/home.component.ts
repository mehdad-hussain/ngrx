import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  // templateUrl: './admin.component.html',
  template: `<app-header></app-header>

    <div class="min-h-[80vh]">
      <router-outlet></router-outlet>
    </div>

    <app-footer></app-footer> `,
  // styleUrls: ['./admin.component.scss'],
})
export class HomeComponent {}
