import {
  actionTypes,
} from 'redux-resource';


export default function dependenciesList(rT) {
  return (state, action) => {
    const {
      resourceType,
      includedResources,
      list,
      mergeDepList = true,
      type,
      relationList,
    } = action;

    if (![
      actionTypes.READ_RESOURCES_SUCCEEDED,
      actionTypes.CREATE_RESOURCES_SUCCEEDED,
      actionTypes.UPDATE_RESOURCES_SUCCEEDED,
    ].includes(type)) {
      return state;
    }

    if (rT !== resourceType) {
      return state;
    }

    if (!list) {
      return state;
    }

    const depList = [
      ...new Set([
        resourceType,
        ...Object.keys(includedResources || {}),
        ...((mergeDepList && state.lists[`${relationList || list}Dependencies`]) || []),
      ]),
    ].sort();
    return {
      ...state,
      lists: {
        ...state.lists,
        [`${relationList || list}Dependencies`]: depList,
      },
    };
  };
}
