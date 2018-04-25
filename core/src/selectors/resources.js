// @flow
import {
  createSelector,
} from 'reselect';

import type {
  State,
} from '../types';


export const getResourceIds = (
  resourceType: string,
  list: string,
) =>
  (state: State) =>
    state[resourceType].lists[list];

export const getResourceMap = (resourceName: string) =>
  (state: State) =>
    state[resourceName].resources;

const resourceSelectors = {};

export const getResourceMappedList = (
  resourceType: string,
  list: string,
) => {
  if (resourceSelectors[resourceType]) {
    return resourceSelectors[`${resourceType}${list}`];
  }
  resourceSelectors[`${resourceType}${list}`] =
    createSelector(
      [
        getResourceIds(resourceType, list),
        getResourceMap(resourceType),
      ],
      (ids = [], map) => ids.map(id => map[id]),
    );
  return resourceSelectors[`${resourceType}${list}`];
};

export const getResourceItemBydId = (
  resourceType: string,
  id: ID,
) =>
  (state: State) =>
    state[resourceType].resources[id] || null;
