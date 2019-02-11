// @flow
import type {
  UiAction,
} from '../types';

import {
  actionTypes,
} from '.';


export const setUiState = (
  key: string,
  values: string | number,
  meta: Object,
): UiAction => ({
  type: actionTypes.SET_UI_STATE,
  payload: {
    key,
    values,
  },
  meta,
});

export const generateRandomString = (): UiAction => ({
  type: actionTypes.GENERATE_RANDOM_STRING,
});
