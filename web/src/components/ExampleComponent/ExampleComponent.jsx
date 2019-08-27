// @flow
import React from 'react';

import type {
  Node,
} from 'react';

import type {
  Action,
} from 'core/types';

import {
  Button,
} from './styled';


type Props = {
  randomString: string,
  generateRandomString: () => Action | void,
};

const ExampleComponent = ({ randomString, generateRandomString }: Props): Node => (
  <div>
    <span>
      {randomString}
    </span>
    <Button
      onClick={generateRandomString}
    >
      Generate random string
    </Button>
  </div>
);

export default ExampleComponent;
