// @flow
import React, {
  type Node,
  type StatelessFunctionalComponent,
} from 'react';
import {
  hot,
} from 'react-hot-loader';

import ExampleContainer from 'web-containers/ExampleContainer';
import ProductsTableContainer from 'web-containers/ProductsTableContainer';


const Base: StatelessFunctionalComponent<*> = (): Node => (
  <div>
    <ExampleContainer />
    <ProductsTableContainer />
  </div>
);

export default hot(module)(Base);
