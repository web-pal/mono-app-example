// @flow
import {
  actionTypes,
} from '../actions';

import type {
  Action,
  UiState,
} from '../types';


const initialState: UiState = {
  randomString: 'Static string',
  images: {
    pixabayImages: [],
    splashbaseImages: [],
  },
  selectedImage: {
    pixabay: {
      image: null,
      index: null,
    },
    splashbase: {
      image: null,
      index: null,
    },
  },
  error: null,
};

// simple universal ui reducer
// export default ui = (
//   state: UiState = initialState,
//   action: Action,
// ) => {
//   switch (action.type) {
//     case actionTypes.SET_UI_STATE:
//       return {
//         ...state,
//         [action.payload.key]: action.payload.value,
//       };
//     default:
//       return state;
//   }
// };

const mergeUiValues = (
  values,
  deepMergeKeys,
  state,
) => (
  Object.keys(values).reduce((s, v) => ({
    ...s,
    [v]: deepMergeKeys.includes(v)
      ? {
        ...state[v],
        ...values[v],
      }
      : values[v],
  }), {})
);

// universal ui reducer, which can get deep into a state tree
const ui = (
  state: UiState = initialState,
  action: Action,
) => {
  switch (action.type) {
    case actionTypes.SET_UI_STATE: {
      const {
        key,
        values,
      } = action.payload;
      const { deepMergeKeys } = action.meta;
      return {
        ...state,
        ...(
          values !== undefined
            ? ({
              [key]: {
                ...state[key],
                ...mergeUiValues(
                  values,
                  deepMergeKeys,
                  state[key],
                ),
              },
            })
            : (
              mergeUiValues(
                key,
                deepMergeKeys,
                state,
              )
            )
        ),
      };
    }
    default:
      return state;
  }
};

export default ui;
