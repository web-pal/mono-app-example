// @flow
import React from "react";
import { connect } from "react-redux";
import { Table } from "antd";

import type { State, ProductResource } from "core/types";
import {TableInfo, TableRow} from "./styled/styled";
import {
  getResourceWithRelationsMappedList,
  variantsStringAttribute,
} from "core/selectors";

const columns = [
  {
    title: "",
    dataIndex: "data",
    key: "data"
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Product name",
    dataIndex: "attributes.name",
    key: "name"
  },
  {
    // Custom attribute
    title: "Variants",
    dataIndex: "ca.variants",
    key: "variants"
  }
];

type Props = {
  dataSource: Array<ProductResource>
};
// const ProductsInfo = () => {
//   console.log(dataSource);
// };
const productsPrice = (d) => {
    return d.rl.productsPrices
    .map((p, index) =>(
        <TableRow key={index}> 
          <div>
            {p.attributes.name}
          </div>
          <div>
          {`$${p.attributes.price / 100}`}
          </div>
        </TableRow>
    ));
}
const ProductsTableContainer = ({ dataSource }: Props) => (
  <Table
    rowKey="id"
    dataSource={dataSource}
    columns={columns}
    expandedRowRender={data => (
      <TableInfo>
        <h1 style={{ fontSize: 20, textAlign: "center"}}>Prices</h1>
        {productsPrice(data)}
        </TableInfo>
    )}
  />
);

const mapStateToProps = (state: State) => ({
  dataSource: getResourceWithRelationsMappedList(
    "products",
    "forTable",
    state,
    resource => ({
      variants: variantsStringAttribute({
        resource
      })
    })
  )(state)
});

const connector = connect(mapStateToProps);

export default connector(ProductsTableContainer);
