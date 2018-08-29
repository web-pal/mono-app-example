// @flow
import * as actionTypes from '../actions/actionTypes';
import type {
  ProductResource,
} from './products';
import type {
  ProductsPriceResource,
} from './productsPrices';
import type {
  ProductsVariantResource,
} from './productsVariants';
import type {
  ProductsSubcategoryResource,
} from './productsSubcategories';
import type {
  StrainsCategoryResource,
} from './strainsCategories';

export type Resources = {
  products: ProductResource,
  productsPrices: ProductsPriceResource,
  productsVariants: ProductsVariantResource,
  productsSubcategories: ProductsSubcategoryResource,
  strainsCategories: StrainsCategoryResource,
};

type ResourceStatuses =
  'IDLE' |
  'PENDING' |
  'SUCCEDED' |
  'FAILED';

export type ResourceType = $Subtype<$Keys<Resources>>;
export type ResourceValue = $Subtype<$Values<Resources>>;

export type ResourceMeta = {|
  [ID]: {|
    createStatus: ResourceStatuses,
    readStatus: ResourceStatuses,
    updateStatus: ResourceStatuses,
    deleteStatus: ResourceStatuses,
  |}
|};

export type ResourceRequests = {|
  [string]: {|
    requestKey: string,
    resourceType: ResourceType,
    status: ResourceStatuses,
    ids: Array<ID>,
  |},
|}

export type ResourcesAction =
  {|
    type: typeof actionTypes.FETCH_RESOURCES_REQUEST,
    resourceType: ResourceType,
    requestKey: string,
    list: string,
  |};
