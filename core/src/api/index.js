// @flow
import type {
  ResourceType,
} from '../types';

import {
  defaultResourceInclude,
} from '../constants';

import mocks from '../mocks';

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
  resourceType,
  withDeleted = false,
  page,
  sort = ['id'],
  filter,
  search,
  include = [],
  fields,
}: {
  resourceType: ResourceType,
  withDeleted: boolean,
  page: {
    limit: number,
    offset: number,
  },
  sort: Array<string>,
  filter: {
    [string]: any,
  },
  search: {
    [string]: any,
  },
  include: Array<string>,
  fields: Array<string>,
}): Promise<ApiResponse> {
  /*
  const requestData = {
    withDeleted,
    page,
    sort,
    filter,
    search,
    include: (
      defaultResourceInclude[resourceType]
        ? defaultResourceInclude[resourceType].concat(include)
        : []
    ),
    fields,
  };
  //  const apiUrl = 'https://api-stage.delivermd.com/api';
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
  */
  return Promise.resolve(mocks);
}
