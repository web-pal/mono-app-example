// @flow
import type {
  UiState,
} from '../types';


export const getUiState = (key: string) =>
  ({ ui }: $ReadOnly<{ ui: UiState }>) => ui[key];
