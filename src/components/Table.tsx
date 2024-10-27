"use client";

import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface Props {
  columns: TableColumnsType<any>;
  data: any[];
  loading?: boolean;
}
const DataTable: React.FC<Props> = ({ columns, data, loading }) => (
  <Table<any> columns={columns} dataSource={data} loading={loading} />
);

export default DataTable;
