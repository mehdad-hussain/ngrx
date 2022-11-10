import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() color: string = 'blue';

  constructor() {}

  ngOnInit(): void {}

  get bgColor() {
    // idea: get function return a modified value of the property
    return `bg-${this.color}-400`;
  }
}
