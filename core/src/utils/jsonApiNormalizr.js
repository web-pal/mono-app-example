// @flow
import * as R from 'ramda';

/* eslint-disable no-param-reassign */
const normalzeResourceItem = resource => ({
  id: resource.id,
  attributes: resource.attributes,
  relationships: R.keys(resource.relationships).reduce(
    (relations, key) => {
      const isMany = Array.isArray(resource.relationships[key].data);
      const { data } = resource.relationships[key];
      relations[key] = {
        type: isMany ? data[0].type : data.type,
        data: isMany ? data.map(relationData => relationData.id) : data.id,
      };
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
  // $FlowFixMe
  resources: entry.data.map(normalzeResourceItem),
  includedResources: entry.included.reduce(reduceResourceItem, {}),
});
