// @flow
import type {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
} from 'redux';

import type {
  UiAction,
  UiState,
} from './ui';

export * from './ui';
export * from './resources';

// Add new actions using |
export type Action =
  UiAction

export type State = {
  ui: UiState,
}

export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
