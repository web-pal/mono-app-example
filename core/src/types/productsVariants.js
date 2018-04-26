// @flow
export type ProductsVariantAttributes = {
  name: string,
  isRaw: boolean,
  weight: number,
  weightUnit: string,
};

export type ProductsVariantRelationships = {
  product: {
    type: 'products',
    data: ID,
  },
};

export type ProductsVariantResource = {
  id: ID,
  attributes: ProductsVariantAttributes,
  relationships: ProductsVariantRelationships,
  rl?: any,
};
