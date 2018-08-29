// @flow
import React from 'react';
import {
  connect,
} from 'react-redux';

import type {
  State,
  Dispatch,
} from 'core/types';

import {
  uiActions,
} from 'core/actions';
import {
  getUiState,
} from 'core/selectors';

import ExampleComponent from 'web-components/ExampleComponent';


type Props = {
  randomString: string,
  dispatch: Dispatch,
};

const ExampleContainer = ({
  randomString,
  dispatch,
}: Props) => (
  <ExampleComponent
    randomString={randomString}
    generateRandomString={
      () => (
        dispatch(uiActions.generateRandomString())
      )
    }
  />
);

const mapStateToProps = (state: State) => ({
  randomString: getUiState('randomString')(state),
});

const connector = connect(
  mapStateToProps,
  (dispatch: Dispatch) => ({
    dispatch,
  }),
);

export default connector(ExampleContainer);
