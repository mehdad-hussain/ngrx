import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, increment, reset, decrement } from '@store';
import { CounterState } from '@core';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss'],
})
export class CounterButtonsComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onIncrement() {
    this.store.dispatch(increment());
  }
  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}
