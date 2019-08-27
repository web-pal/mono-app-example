// @flow
import React from 'react';
import {
  connect,
} from 'react-redux';
import type {
  State, Dispatch,
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
  browserHistory: Object
};

const ExampleContainer = ({ randomString, dispatch, browserHistory }: Props) => (
  <div>
    <ExampleComponent
      randomString={randomString}
      generateRandomString={
      () => (
        dispatch(uiActions.generateRandomString())
      )
    }
    />
    <button
      type="button"
      onClick={() => browserHistory.goBack()}
    >
      Go back
    </button>
  </div>
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
