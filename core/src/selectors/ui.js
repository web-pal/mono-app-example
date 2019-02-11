// @flow

export const getUiState = (keyOrKeys: string | Array<string>) => (
  ({ ui }: { ui: UiState }) => (
    Array.isArray(keyOrKeys)
      ? (
        keyOrKeys.reduce(
          (acc, key) => ({
            ...acc,
            [key]: ui[key],
          }),
          {},
        )
      )
      : ui[keyOrKeys]
  )
);
