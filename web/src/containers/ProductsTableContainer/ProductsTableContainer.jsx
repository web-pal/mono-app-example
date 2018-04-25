// @flow
import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Table,
} from 'antd';

import {
  getUiState,
  getResourceMappedList,
} from 'core/selectors';


const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Product name',
  dataIndex: 'attributes.name',
  key: 'name',
}];

type Props = {
  dataSource: Array<{
    id: ID,
    attributes: {
      name: string,
    },
  }>,
};

const ProductsTableContainer = ({ dataSource }: Props) => (
  <div>
    <Table
      rowKey="id"
      dataSource={dataSource}
      columns={columns}
    />
  </div>
);

const mapStateToProps = state => ({
  randomString: getUiState('randomString')(state),
  dataSource: getResourceMappedList('products', 'forTable')(state),
});

const connector = connect(
  mapStateToProps,
);

export default connector(ProductsTableContainer);

