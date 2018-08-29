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
  return state => (
    state[resourceType].lists[list] || []
  );
}

export function getResourceAllIds<T: ResourceType >(
  resourceType: T,
): (State) => Array<ID> {
  return state => (
    Object.keys(state[resourceType].resources)
  );
}

function getResourceMap<T: ResourceType>(
  resourceType: T,
): (State) => $PropertyType<$ElementType<State, T>, 'resources'> {
  return state => (
    state[resourceType].resources
  );
}

const resourceSelectors = {};

/* Selector which return list of resources without relationships */
export function getResourceMappedList<T: ResourceType, L: string>(
  resourceType: T,
  list: L,
): Selector<
     State,
     any,
     $TupleMap<
       $ElementType<$PropertyType<$ElementType<State, T>, 'lists'>, L>,
       <V: ID>(id: V) => $ElementType<Resources, T>
     >
   > {
  if (resourceSelectors[resourceType]) {
    return resourceSelectors[`${resourceType}${list}`];
  }
  resourceSelectors[`${resourceType}${list}`] = createSelector(
    [
      getResourceIds(resourceType, list),
      getResourceMap(resourceType),
    ],
    (
      ids = [],
      map,
    ) => (
      ids.map(id => map[id])
    ),
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
  const resourceWithRl = {
    ...resource,
    rl: R.keys(resource.relationships).reduce(
      (acc, relationName) => {
        const relT = resource.relationships[relationName];
        acc[relationName] = Array.isArray(relT.data) ? (
          relT.data.map(rId => getNestedResourceItem(
            relT.type,
            rId,
            state,
          ))
        ) : (
          getNestedResourceItem(
            relT.type,
            relT.data,
            state,
          ));
        return acc;
      },
      {},
    ),
  };
  if (customAttributesCreator) {
    // $FlowFixMe
    resourceWithRl.ca = customAttributesCreator(resourceWithRl, state);
  }
  return resourceWithRl;
}

/* Selector which return list of resources with all relationships */
export function getResourceNestedMappedList<
  T: ResourceType,
  L: string,
>(
  resourceType: T,
  list: L,
  state: State,
  reverse: boolean = false,
  // customAttributesCreator allow extend resource object with custom attributes
  customAttributesCreator?: (resource: ResourceValue, state: Resources) => { [string]: any },
): Selector<
     State,
     any,
     $TupleMap<
       $ElementType<$PropertyType<$ElementType<State, T>, 'lists'>, L>,
       <V: ID>(id: V) => $ElementType<Resources, T>
     >,
   > {
  const relDependencies = (state[resourceType].lists[`${list}Dependencies`] || []);
  const selectorName = `${resourceType}${list}${relDependencies.join()}`;
  if (resourceSelectors[selectorName]) {
    return resourceSelectors[selectorName];
  }

  resourceSelectors[selectorName] = (
    // $FlowFixMe it can't be fixed because of reselect definition
    createSelector(
      [
        getResourceIds(resourceType, list),
        ...relDependencies.map(
          rt => (
            getResourceMap(rt)
          ),
        ),
      ],
      (
        ids = [],
        ...resourcesMap
      ) => (
        (reverse ? R.reverse(ids) : ids).map(
          id => (
            getNestedResourceItem(
              resourceType,
              id,
              // $FlowFixMe
              relDependencies.reduce(
                (acc, rT, index) => {
                  acc[rT] = resourcesMap[index];
                  return acc;
                },
                {},
              ),
              customAttributesCreator,
            )),
        )
      ),
    )
  );
  return resourceSelectors[selectorName];
}

export function getResourceItemBydId<T: ResourceType, I: ID>(
  resourceType: T,
  id: I,
): (State) => $ElementType<$PropertyType<$ElementType<State, T>, 'resources'>, I> {
  return state => (
    state[resourceType].resources[id] || null
  );
}
