// @flow
import * as R from 'ramda';


const isMany = data => Array.isArray(data);
const isDataExist = data => (isMany(data) && data.length) || (!isMany(data) && data);
const getDataType = data => (isMany(data) ? data[0].type : data.type);
/* eslint-disable no-param-reassign */
const normalzeResourceItem = resource => ({
  id: resource.id,
  attributes: resource.attributes,
  relationships: R.keys(resource.relationships).reduce(
    (relations, key) => {
      const { data } = resource.relationships[key];
      const iM = isMany(data);
      if (isDataExist(data)) {
        relations[key] = {
          type: getDataType(data),
          data: iM ? data.map(relationData => relationData.id) : data.id,
        };
      }
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
  resources: (Array.isArray(entry.data) ? entry.data : [entry.data]).map(normalzeResourceItem),
  includedResources: entry.included.reduce(reduceResourceItem, {}),
});
