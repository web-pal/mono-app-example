// @flow
export type StrainsCategoryAttributes = {
  name: string,
};

export type StrainsCategoryRelationships = {};

export type StrainsCategoryResource = {
  id: ID,
  attributes: StrainsCategoryAttributes,
  relationships: StrainsCategoryRelationships,
  rl?: {},
};
