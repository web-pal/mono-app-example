// @flow
import {
  takeEvery,
  put,
} from 'redux-saga/effects';
import {
  uiActions,
  actionTypes,
} from '../actions';


export function* generateRandomString(): Generator<*, void, *> {
  yield put(uiActions.setUiState(
    'randomString',
    Math.random().toString(36).substring(7),
  ));
}

export function* listenGenerateRandomString(): Generator<*, void, *> {
  yield takeEvery(
    [
      actionTypes.GENERATE_RANDOM_STRING,
    ],
    generateRandomString,
  );
}
