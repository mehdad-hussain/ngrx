import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
  @Input() sidebarClasses: string = '';

  constructor() {}

  ngOnInit(): void {}
}
