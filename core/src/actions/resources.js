// @flow
import type {
  ResourcesAction,
  ResourceType,
} from '../types';

import {
  actionTypes,
} from '../actions';


export const fetchResourcesRequest = ({
  resourceType,
  requestKey,
  list,
}: {
  resourceType: ResourceType,
  requestKey: string,
  list: string,
}): ResourcesAction => ({
  type: actionTypes.FETCH_RESOURCES_REQUEST,
  resourceType,
  requestKey,
  list,
});
