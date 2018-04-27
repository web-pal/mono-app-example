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
  Resources,
} from '../types';

function getResourceIds<T: ResourceType, L: string>(
  resourceType: T,
  list: L,
): (State) => $ElementType<$PropertyType<$ElementType<State, T>, 'lists'>, L> {
  return state =>
    state[resourceType].lists[list] || [];
}

function getResourceMap<T: ResourceType>(
  resourceType: T,
): (State) => $PropertyType<$ElementType<State, T>, 'resources'> {
  return state =>
    state[resourceType].resources;
}

const resourceSelectors = {};

export function getResourceMappedList<T: ResourceType, L: string>(
  resourceType: T,
  list: L,
): Selector<State, any, $TupleMap<$ElementType<$PropertyType<$ElementType<State, T>, 'lists'>, L>, <V: ID>(id: V) => $ElementType<Resources, T>>> {
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
}


export function getNestedResourceItem<T: ResourceType, S: Resources>(
  resourceType: T,
  id: ID,
  state: S,
  customAttributesCreator?: (resource: ResourceValue, state: S) => { [string]: any },
): $ElementType<S, T> {
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
}

export function getResourceWithRelationsMappedList<T: ResourceType, L: string>(
  resourceType: T,
  list: L,
  state: State,
  customAttributesCreator?: (resource: ResourceValue, state: Resources) => { [string]: any },
): Selector<State, any, $TupleMap<$ElementType<$PropertyType<$ElementType<State, T>, 'lists'>, L>, <V: ID>(id: V) => $ElementType<Resources, T>>> {
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
              // $FlowFixMe
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
}

export function getResourceItemBydId<T: ResourceType, I: ID>(
  resourceType: T,
  id: I,
): (State) => $ElementType<$PropertyType<$ElementType<State, T>, 'resources'>, I> {
  return state =>
    state[resourceType].resources[id] || null;
}
