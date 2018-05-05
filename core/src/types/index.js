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
  Resources,
  ResourcesAction,
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

type RestState = {|
  ui: UiState,
|};

type ResourcesState = $ObjMap<Resources,
  <T>(T) => {
    resources: {
      [ID]: $Exact<T>,
    },
    meta: ResourceMeta,
    requests: ResourceRequests,
    lists: {
      [string]: Array<ID>,
    },
    resourceType: string,
  }>

export type State = RestState & ResourcesState;

export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
