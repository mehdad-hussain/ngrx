import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { AppState, getCounter } from '@store';
import { CounterState } from '@core';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss'],
})
export class CounterOutputComponent implements OnInit {
  counter$: Observable<number> | undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }
}
