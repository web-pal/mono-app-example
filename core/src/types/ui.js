// @flow
import {
  actionTypes,
} from '../actions';

// Add new actions using |
export type UiAction =
  {|
    type: typeof actionTypes.SET_UI_STATE,
    payload: {|
      key: string,
      value: any,
    |},
  |} | {|
    type: typeof actionTypes.GENERATE_RANDOM_STRING,
  |};

export type UiState = {|
  randomString: string,
|};
