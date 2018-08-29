// @flow
import type {
  ProductsPriceResource,
} from './productsPrices';
import type {
  ProductsVariantResource,
} from './productsVariants';


export type ProductAttributes = {
  name: string,
};

export type ProductRelationships = {
  productsPrices: {
    type: 'productsPrices',
    data: Array<ID>,
  },
  productsVariants: {
    type: 'productsVariants',
    data: Array<ID>,
  },
};

export type ProductResource = {
  id: ID,
  attributes: ProductAttributes,
  relationships: ProductRelationships,
  rl?: {
    productsPrices: Array<ProductsPriceResource>,
    productsVariants: Array<ProductsVariantResource>,
  },
};
