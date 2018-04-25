// @flow
import * as actionTypes from '../actions/actionTypes';

export type ResourcesReducersList = {
  products: any,
  productsPrices: any,
};

export type ResourceType = $Keys<ResourcesReducersList>;


export type ResourcesAction =
  {|
    type: typeof actionTypes.FETCH_RESOURCES_REQUEST,
    resourceType: ResourceType,
    requestKey: string,
    list: string,
  |};
