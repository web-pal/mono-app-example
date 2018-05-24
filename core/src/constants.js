// @flow
import type {
  ResourceType,
} from './types';

export const resourcesList: Array<ResourceType> = [
  'products',
  'productsPrices',
  'productsVariants',
  'productsSubcategories',
  'strainsCategories',
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

export const defaultResourceInclude = {
  products: [
    'productsPrices',
    'productsVariants',
    'strainsCategory',
    'productsSubcategories',
  ],
};
