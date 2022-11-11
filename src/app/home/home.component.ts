import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  // templateUrl: './admin.component.html',
  template: `
    <!-- <app-header></app-header>

    <app-side-navbar></app-side-navbar>
    <div class="min-h-[80vh]">
      <router-outlet></router-outlet>
    </div>

    <app-footer></app-footer> -->

    <app-list-page-layout></app-list-page-layout>
  `,
  // styleUrls: ['./admin.component.scss'],
})
export class HomeComponent {}
