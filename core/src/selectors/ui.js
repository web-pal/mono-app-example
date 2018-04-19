// @flow
import type {
  UiState,
} from '../types';


export const getUiState = (key: string) =>
  ({ ui }: { ui: UiState }) => ui[key];
