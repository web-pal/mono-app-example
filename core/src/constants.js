// @flow
import type {
  ResourceType,
} from './types';

export const resourcesList: Array<ResourceType> = [
  'products',
  'productsPrices',
  'productsVariants',
];

export const initialResoucesLists: {
  [ResourceType]: {
    [string]: Array<ID>,
  },
} = {
  products: {
    forTable: [],
  },
};
