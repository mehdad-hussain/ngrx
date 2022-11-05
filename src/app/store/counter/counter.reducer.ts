// prettier-ignore
import { increment, decrement, reset, customIncrement, changeChannelName, } from '@store';
import { Action, createReducer, on } from '@ngrx/store';

import { CounterState } from '@core';

export const initialState: CounterState = {
  counter: 4,
  channelName: 'Mehdad Channel',
};

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrement, (state, action) => {
    console.log(action);
    return {
      ...state,
      counter: state.counter + action.count,
    };
  }),
  on(changeChannelName, (state) => {
    return {
      ...state,
      channelName: 'Modified Mehdad Channel',
    };
  })
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action
) {
  return _counterReducer(state, action);
}
