import React from 'react';
import {
  storiesOf,
} from '@storybook/react';

import {
  getResourceNestedMappedList,
  variantsStringAttribute,
} from 'core/selectors';

import {
  Table,
  Icon,
} from 'antd';

import Placeholder from 'web-components/Placeholder';
import Component from 'web-components/ConnectComponent';


const antIcon = (
  <Icon
    spin
    type="loading"
    style={{
      fontSize: 24,
    }}
  />
);

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Product name',
  dataIndex: 'attributes.name',
  key: 'name',
}, {
  // Custom attribute
  title: 'Variants',
  dataIndex: 'ca.variants',
  key: 'variants',
}];


const getColumns = (isLoading) => {
  if (isLoading) {
    return columns.map((item) => {
      const { render, ...rest } = item;
      return rest;
    });
  } return columns.map(item => Object.assign(
    item, { render: () => <Placeholder indicator={antIcon} /> },
  ));
};

storiesOf('data-table', module)
  .add('default-table', () => (
    <Component
      mapStateToProps={state => ({
        dataSource: getResourceNestedMappedList(
          'products',
          'forTable',
          state,
          false,
          resource => ({
            variants: variantsStringAttribute({
              resource,
            }),
          }),
        )(state),
      })}
    >
      {props => (
        <Table
          rowKey="id"
          dataSource={props.dataSource}
          columns={getColumns(true)}
        />
      )}
    </Component>
  ))
  .add('placeholder-table', () => (
    <Component
      mapStateToProps={state => ({
        dataSource: getResourceNestedMappedList(
          'products',
          'forTable',
          state,
          false,
          resource => ({
            variants: variantsStringAttribute({
              resource,
            }),
          }),
        )(state),
      })}
    >
      {props => (
        <div>
          <Table
            rowKey="id"
            dataSource={props.dataSource}
            columns={getColumns(false)}
          />
        </div>
      )}
    </Component>
  ));
