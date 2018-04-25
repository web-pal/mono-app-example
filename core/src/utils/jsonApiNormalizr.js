// @flow
import * as R from 'ramda';

/* eslint-disable no-param-reassign */
const normalzeResourceItem = resource => ({
  id: resource.id,
  attributes: resource.attributes,
  relationships: R.keys(resource.relationships).reduce(
    (relations, key) => {
      relations[key] = Array.isArray(resource.relationships[key].data)
        ? resource.relationships[key].data.map(relationData => relationData.id)
        : resource.relationships[key].data.id;
      return relations;
    },
    {},
  ),
});

function reduceResourceItem(result, entry) {
  if (!result[entry.type]) {
    result[entry.type] = {};
  }
  result[entry.type][entry.id] = normalzeResourceItem(entry);
  return result;
}
/* eslint-enable no-param-reassign */

export const jsonApiNormalizr = (
  entry: {
    data: Array<any>,
    included: Array<any>,
  },
) => ({
  resources: entry.data.map(normalzeResourceItem),
  includedResources: entry.included.reduce(reduceResourceItem, {}),
});
