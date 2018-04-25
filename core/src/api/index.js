// @flow
import type {
  ResourceType,
} from '../types';

type ApiResponse = {
  data: Array<any>,
  included: Array<any>,
  links: {
    self: string,
  },
  meta: {
    limit: number,
    offset: number,
    pageCount: number,
    rowCount: number,
  },
};

export function fetchResourcesApi({
  sortBy = 'id',
  sortDirection = '',
  withDeleted = false,
  limitCondition = {},
  offsetCondition = {},
  filterCondition = {},
  include = [],
  fields = [],
  resourceType,
}: {
  sortBy?: string,
  sortDirection?: string,
  withDeleted?: boolean,
  limitCondition?: any,
  offsetCondition?: any,
  filterCondition?: any,
  include?: Array<string>,
  fields?: Array<string>,
  resourceType: ResourceType,
}): Promise<ApiResponse> {
  const pageConditionObject = {
    page: {
      ...limitCondition,
      ...offsetCondition,
    },
  };
  const pageCondition = pageConditionObject.page ? pageConditionObject : {};
  const requestData = {
    withDeleted,
    ...pageCondition,
    ...filterCondition,
    include,
    fields,
    sort: [
      `${sortDirection}${sortBy}`,
    ],
  };
  const apiUrl = 'https://api.delivermd.com/api';
  return fetch(
    `${apiUrl}/${resourceType}/marketplace/filter`,
    {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  ).then((response) => {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }
    throw new Error(response);
  });
}
