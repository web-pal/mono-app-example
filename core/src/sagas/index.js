// @flow
import {
  all,
  fork,
} from 'redux-saga/effects';

import * as uiSagas from './ui';


export default function* rootSaga(): Generator<*, void, *> {
  yield all([
    fork(uiSagas.listenGenerateRandomString),
  ]);
}
