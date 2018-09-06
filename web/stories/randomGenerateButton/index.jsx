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

import Connect from '../../src/components/Connect/index';
import ExampleComponent from '../../src/components/ExampleComponent/ExampleComponent';


storiesOf('generate-random-button', module)
  .add('random-button-default', () => (
    <Connect
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
    </Connect>
  ));
