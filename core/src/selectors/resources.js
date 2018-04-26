// @flow
import * as R from 'ramda';
import {
  createSelector,
} from 'reselect';

import type {
  Selector,
} from 'reselect';
import type {
  State,
  ResourceType,
  ResourceValue,
  ResourcesReducersList,
  Resources,
} from '../types';

export const getResourceIds = (
  resourceType: ResourceType,
  list: string,
) =>
  (state: State): Array<ID> => {
    if (!state[resourceType]) {
      return [];
    }
    return state[resourceType].lists[list] || [];
  };

export const getResourceMap = (
  resourceType: ResourceType,
) =>
  (state: State): ResourceValue =>
    (state[resourceType] ? state[resourceType].resources : {});

const resourceSelectors = {};

export const getResourceMappedList = (
  resourceType: ResourceType,
  list: string,
): Selector<State, any, Array<$Values<ResourceValue>>> => {
  if (resourceSelectors[resourceType]) {
    return resourceSelectors[`${resourceType}${list}`];
  }
  resourceSelectors[`${resourceType}${list}`] =
    createSelector(
      [
        getResourceIds(resourceType, list),
        getResourceMap(resourceType),
      ],
      (
        ids = [],
        map,
      ) =>
        ids.map(id => map[id]),
    );
  return resourceSelectors[`${resourceType}${list}`];
};


export const getNestedResourceItem = (
  resourceType: ResourceType,
  id: ID,
  state: ResourcesReducersList,
  customAttributesCreator: any,
) => {
  const resource = state[resourceType][id];
  resource.rl = R.values(resource.relationships).reduce(
    (acc, relT) => {
      acc[relT.type] = Array.isArray(relT.data) ?
        relT.data.map(rId => getNestedResourceItem(
          relT.type,
          rId,
          state,
        )) :
        getNestedResourceItem(
          relT.type,
          relT.data,
          state,
        );
      return acc;
    },
    {},
  );
  if (customAttributesCreator) {
    // $FlowFixMe
    resource.ca = customAttributesCreator(resource, state);
  }
  return resource;
};

export const getResourceWithRelationsMappedList = (
  resourceType: ResourceType,
  list: string,
  state: State,
  customAttributesCreator: (
    resource: any,
  ) => any,
): any => {
  // Return list of dependecies resourcesTypes
  const getResourceRelationships = (
    rT: ResourceType,
    rList: string | Array<ID>,
  ): Array<ResourceType> => {
    const resourceIds = (typeof rList === 'string') ? getResourceIds(rT, rList)(state) : list;
    const resourceMap = getResourceMap(rT)(state);

    const resource = resourceIds[0] ? resourceMap[resourceIds[0]] : null;

    return (
      resource ? [
        ...R.values(resource.relationships)
          .map(rel => rel.type),
        ...[].concat(
          ...R.values(resource.relationships)
            .map(rel => getResourceRelationships(
              rel.type,
              Array.isArray(rel.data) ? rel.data : [rel.data],
            )),
        ),
      ] :
        []
    );
  };

  const relResourceTypes = [...new Set([
    resourceType,
    ...(
      getResourceRelationships(
        resourceType,
        list,
      )
    ),
  ].filter(st => state[st]))];

  const selectorName = `${resourceType}${list}${relResourceTypes.join()}`;
  resourceSelectors[selectorName] =
    // $FlowFixMe it can't be fixed because of reselect definition
    createSelector(
      [
        getResourceIds(resourceType, list),
        ...relResourceTypes.map(
          rt =>
            getResourceMap(rt),
        ),
      ],
      (
        ids = [],
        ...resourcesMap
      ) =>
        ids.map(
          id =>
            getNestedResourceItem(
              resourceType,
              id,
              relResourceTypes.reduce(
                (acc, rT, index) => {
                  acc[rT] = resourcesMap[index];
                  return acc;
                },
                {},
              ),
              customAttributesCreator,
            ),
        ),
    );
  return resourceSelectors[selectorName];
};

export const getResourceItemBydId = (
  resourceType: ResourceType,
  id: ID,
) =>
  (state: State): $Values<Resources> | null =>
    state[resourceType].resources[id] || null;
