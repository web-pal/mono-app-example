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

export type State = {|
  ui: UiState,
  products: {
    resources: {
      [ID]: $PropertyType<Resources, 'products'>,
    },
    meta: ResourceMeta,
    requests: ResourceRequests,
    lists: {
      forTable: Array<ID>,
    },
    resourceType: 'products',
  },
  productsPrices: {
    resources: {
      [ID]: $PropertyType<Resources, 'productsPrices'>,
    },
    meta: ResourceMeta,
    requests: ResourceRequests,
    lists: {
      [string]: Array<ID>,
    },
    resourceType: 'productsPrices',
  },
  productsVariants: {
    resources: {
      [ID]: $PropertyType<Resources, 'productsVariants'>,
    },
    meta: ResourceMeta,
    requests: ResourceRequests,
    lists: {
      [string]: Array<ID>,
    },
    resourceType: 'productsVariants',
  },
|};

export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
