// @flow
import {
  combineReducers,
} from 'redux';
import {
  resourceReducer,
} from 'redux-resource';
import {
  includedResources,
} from 'redux-resource-plugins';

import {
  resourcesList,
  initialResoucesLists,
} from '../constants';


import ui from './ui';


const rootReducer = combineReducers({
  ui,
  ...resourcesList.reduce(
    (acc, resourceName) => ({
      ...acc,
      [resourceName]: resourceReducer(
        resourceName, {
          plugins: [includedResources],
          initialState: {
            lists: {
              ...(initialResoucesLists[resourceName] || {}),
            },
          },
        },
      ),
    }), {},
  ),
});

export default rootReducer;
