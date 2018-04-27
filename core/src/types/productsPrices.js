// @flow
import type {
  ProductResource,
} from './products';


export type ProductsPriceAttributes = {
  name: string,
  price: number,
};

export type ProductsPriceRelationships = {
  product: {
    type: 'products',
    data: ID,
  },
};

export type ProductsPriceResource = {
  id: ID,
  attributes: ProductsPriceAttributes,
  relationships: ProductsPriceRelationships,
  rl?: {
    product: ProductResource,
  },
};
