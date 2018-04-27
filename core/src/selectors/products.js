// @flow

export const variantsStringAttribute = ({
  resource,
  showRaw = false,
  delimiter = ', ',
}: {
  resource: any,
  showRaw?: boolean,
  delimiter?: string,
}) =>
  resource.rl.productsVariants
    .filter(p => showRaw || !p.attributes.isRaw)
    .map(p => (p.attributes.name)).join(delimiter);
