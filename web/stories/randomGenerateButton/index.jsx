import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import {
  uiActions,
} from 'core/actions';
import {
  getUiState,
} from 'core/src/selectors/index';

import Component from 'web-components/ConnectComponent';
import ExampleComponent from 'web-components/ExampleComponent';


storiesOf('generate-random-button', module)
  .add('random-button-default', () => (
    <Component
      mapStateToProps={
        state => ({
          randomString: getUiState('randomString')(state),
        })}
    >
      {props => (
        <ExampleComponent
          randomString={props.randomString}
          generateRandomString={
        () => (
          props.dispatch(uiActions.generateRandomString())
        )
      } />
      )}
    </Component>
  ));
