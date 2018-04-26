export const variantsStringAttribute = ({
  resource,
  showRaw = false,
  delimiter = ', ',
}) =>
  resource.rl.productsVariants
    .filter(p => showRaw || !p.attributes.isRaw)
    .map(p => (p.attributes.name)).join(delimiter);
