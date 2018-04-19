// @flow
import type {
  UiAction,
} from '../types';

import {
  actionTypes,
} from '../actions';


export const setUiState = (
  key: string,
  value: string | number,
): UiAction => ({
  type: actionTypes.SET_UI_STATE,
  payload: {
    key,
    value,
  },
});

export const generateRandomString = (): UiAction => ({
  type: actionTypes.GENERATE_RANDOM_STRING,
});
