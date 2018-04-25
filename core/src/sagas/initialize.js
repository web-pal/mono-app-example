// @flow
import {
  put,
} from 'redux-saga/effects';

import {
  resourcesActions,
} from '../actions';


export default function* initialize(): Generator<*, void, *> {
  try {
    yield put(resourcesActions.fetchResourcesRequest({
      resourceType: 'products',
      requestKey: 'fetchProductsForTable',
      list: 'forTable',
    }));
  } catch (err) {
    console.log(err);
  }
}
