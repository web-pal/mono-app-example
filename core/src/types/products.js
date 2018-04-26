// @flow
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
  rl?: any,
};

