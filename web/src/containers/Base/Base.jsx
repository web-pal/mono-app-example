// @flow
import React, {
  type Node,
  type StatelessFunctionalComponent,
} from 'react';
import {
  hot,
} from 'react-hot-loader';

import ExampleContainer from 'web-containers/ExampleContainer';

const Base: StatelessFunctionalComponent<*> = (): Node => (
  <ExampleContainer />
);

export default hot(module)(Base);
