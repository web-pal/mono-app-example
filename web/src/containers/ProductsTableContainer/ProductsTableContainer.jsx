// @flow
import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Table,
} from 'antd';

import type {
  State,
  ProductResource,
} from 'core/types';

import {
  getResourceWithRelationsMappedList,
} from 'core/selectors';


const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Product name',
  dataIndex: 'attributes.name',
  key: 'name',
}, {
  title: 'Variants',
  dataIndex: 'ca.variants',
  key: 'variants',
}];

type Props = {
  dataSource: Array<ProductResource>,
};

const ProductsTableContainer = ({ dataSource }: Props) => (
  <Table
    rowKey="id"
    dataSource={dataSource}
    columns={columns}
  />
);

const mapStateToProps = (state: State) => ({
  dataSource: getResourceWithRelationsMappedList(
    'products',
    'forTable',
    state,
    resource => ({
      variants:
        resource.rl.productsVariants
          .filter(p => !p.attributes.isRaw)
          .map(p => (p.attributes.name)).join(', '),
    }),
  )(state),
});

const connector = connect(
  mapStateToProps,
);

export default connector(ProductsTableContainer);

