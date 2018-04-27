// @flow
import type {
  State,
  UiState,
  UiStateKey,
} from '../types';


export function getUiState<UK: UiStateKey>(
  key: UK,
): (State) => $ElementType<UiState, UK> {
  return state =>
    state.ui[key];
}
