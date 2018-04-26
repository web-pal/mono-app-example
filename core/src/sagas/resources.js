// @flow
import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import createActionCreators from 'redux-resource-action-creators';

import type {
  ResourceType,
} from '../types';

import {
  actionTypes,
} from '../actions';
import {
  jsonApiNormalizr,
} from '../utils';
import * as Api from '../api';


function* fetchResources({
  resourceType,
  requestKey,
  list,
}: {|
  resourceType: ResourceType,
  requestKey: string,
  list: string,
|}): Generator<*, void, *> {
  const actions = createActionCreators('read', {
    resourceType,
    requestKey,
    list,
    mergeListIds: false,
  });
  try {
    yield put(actions.pending());
    const response =
      yield call(
        Api.fetchResourcesApi,
        {
          resourceType,
          limitCondition: {
            limit: 10,
          },
        },
      );
    const normalizedData = jsonApiNormalizr(response);
    yield put(actions.succeeded({
      resources: normalizedData.resources,
      includedResources: normalizedData.includedResources,
    }));
  } catch (err) {
    console.log(err);
    yield put(actions.succeeded({
      resources: [],
    }));
  }
}

export function* listenFetchResourcesRequest(): Generator<*, void, *> {
  yield takeEvery(
    actionTypes.FETCH_RESOURCES_REQUEST,
    fetchResources,
  );
}
