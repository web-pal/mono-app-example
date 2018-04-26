// @flow
import type {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
} from 'redux';

import type {
  UiAction,
  UiState,
} from './ui';

import type {
  ResourcesAction,
  ResourceType,
  ResourceValue,
  ResourceMeta,
  ResourceRequests,
} from './resources';


export * from './ui';
export * from './products';
export * from './productsPrices';
export * from './productsVariants';
export * from './resources';

export type Action =
  UiAction |
  ResourcesAction;

export type State = $ReadOnly<{
  ui: UiState,
  [ResourceType]: {|
    resources: ResourceValue,
    meta: ResourceMeta,
    requests: ResourceRequests,
    lists: {|
      [string]: Array<ID>,
    |},
    resourceType: ResourceType,
  |}
}>

export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
