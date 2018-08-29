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
  relationList,
  resources = [],
  query,
}: {|
  resourceType: ResourceType,
  requestKey: string,
  list: string,
  relationList?: string,
  resources: Array<ID>,
  query: {
    withDeleted: boolean,
    page: {
      limit: number,
      offset: number,
    },
    sort: Array<string>,
    filter: {
      [string]: any,
    },
    search: {
      [string]: any,
    },
    include: Array<string>,
    fields: Array<string>,
  },
|}): Generator<*, void, *> {
  const actions = createActionCreators('read', {
    resourceType,
    requestKey,
    resources,
    list,
    mergeListIds: false,
  });
  try {
    yield put(actions.pending());
    const response = yield call(
      Api.fetchResourcesApi,
      {
        resourceType,
        ...query,
      },
    );
    const normalizedData = jsonApiNormalizr(response);
    yield put(actions.succeeded({
      resources: normalizedData.resources,
      includedResources: normalizedData.includedResources,
      relationList,
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
