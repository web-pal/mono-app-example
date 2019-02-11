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
    },
    splashbase: {
      image: null,
    },
  },
  error: null,
};

const mergeValues = (
  values,
  state,
) => (
  Object.keys(values).reduce((s, v) => ({
    ...s,
    [v]: values[v]?._merge ? ({ /* eslint-disable-line */
      ...state[v],
      ...values[v],
    }) : (
      values[v]
    ),
  }), {})
);

// universal ui reducer, which can set deep into a state tree
const ui = (
  state: UiState = initialState,
  action: Action,
) => {
  switch (action.type) {
    case actionTypes.SET_UI_STATE: {
      const {
        keyOrRootValues,
        maybeValues,
      } = action.payload;
      const [
        values,
        key,
      ] = (
        maybeValues === undefined
          ? [
            keyOrRootValues,
            null,
          ]
          : [
            maybeValues,
            keyOrRootValues,
          ]
      );
      return {
        ...state,
        ...(
          key
            ? ({
              [key]: {
                ...state[key],
                ...mergeValues(
                  values,
                  state[key],
                ),
              },
            })
            : (
              mergeValues(
                values,
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
