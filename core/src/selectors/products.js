// @flow
import type {
  ProductResource,
} from '../types';

export const variantsStringAttribute = ({
  resource,
  showRaw = false,
  delimiter = ', ',
}: {
  resource: ProductResource,
  showRaw?: boolean,
  delimiter?: string,
}): string => (
  resource.rl ?
    resource.rl.productsVariants
      .filter(p => showRaw || !p.attributes.isRaw)
      .map(p => (p.attributes.name)).join(delimiter) :
    ''
);
