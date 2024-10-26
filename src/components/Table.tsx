"use client";

import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

// const columns: TableColumnsType<any> = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     filters: [
//       {
//         text: "Joe",
//         value: "Joe",
//       },
//       {
//         text: "Category 1",
//         value: "Category 1",
//       },
//       {
//         text: "Category 2",
//         value: "Category 2",
//       },
//     ],
//     filterMode: "tree",
//     filterSearch: true,
//     onFilter: (value, record) => record.name.startsWith(value as string),
//     width: "30%",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     sorter: (a, b) => a.age - b.age,
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     filters: [
//       {
//         text: "London",
//         value: "London",
//       },
//       {
//         text: "New York",
//         value: "New York",
//       },
//     ],
//     onFilter: (value, record) => record.address.startsWith(value as string),
//     filterSearch: true,
//     width: "40%",
//   },
// ];

// const data: DataType[] = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
// ];

const onChange: TableProps<any>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  // console.log("params", pagination, filters, sorter, extra);
};

interface Props {
  columns: TableColumnsType<any>;
  data: any[];
  loading?: boolean;
  onRow: (record: any) => void;
}
const DataTable: React.FC<Props> = ({ columns, data, loading, onRow }) => (
  <Table<any>
    columns={columns}
    dataSource={data}
    onRow={(record) => ({
      onClick: () => onRow(record),
    })}
    loading={loading}
  />
);

export default DataTable;
