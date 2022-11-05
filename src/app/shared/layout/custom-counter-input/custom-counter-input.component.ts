import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// prettier-ignore
import { AppState, changeChannelName, customIncrement, getChannelName, } from '@store';

import { CounterState } from '@core';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss'],
})
export class CustomCounterInputComponent implements OnInit {
  value: number | undefined;
  channelName$: Observable<string> | undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd() {
    this.store.dispatch(customIncrement({ count: +this.value! }));
  }

  onChangeChannelName() {
    this.store.dispatch(changeChannelName());
  }
}
