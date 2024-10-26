"use client";
import {
  DashboardFilled,
  UsergroupAddOutlined,
  CloseOutlined,
  SecurityScanFilled,
} from "@ant-design/icons";
import { Col, Popconfirm, Row, TableColumnsType } from "antd";

import { UserDataType } from "@/types/user";

export const FORM_INPUTS = [
  {
    name: "email",
    label: "Email",
    required: true,
    type: "email",
    rules: [{ required: true, message: "Please input your username!" }],
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    rules: [{ required: true, message: "Please input your password!" }],
  },
];

export const SIDER_MENU = [
  {
    key: "1",
    path: "/",
    icon: <DashboardFilled />,
    label: "Dashboard",
  },
  {
    key: "2",
    path: "/agents",
    icon: <UsergroupAddOutlined />,
    label: "Agents",
  },
];

export const COLUMNS: TableColumnsType<UserDataType> = [
  {
    title: "ID",
    dataIndex: "uid",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Full Name",
    dataIndex: "displayName",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    align: "center",
    render: (_, record) => <>{record.phoneNumber ? record.phoneNumber : "-"}</>,
  },
  {
    title: "Action",
    dataIndex: "operation",
    align: "center",
    render: (_, record) => (
      <>
        <Row justify="center" align="middle" gutter={[16, 16]}>
          <Col>
            <Popconfirm title="Are you sure?">
              <a>
                <CloseOutlined style={{ color: "red" }} />
              </a>
            </Popconfirm>
          </Col>
          <Col>
            <a>
              <SecurityScanFilled />
            </a>
          </Col>
        </Row>
      </>
    ),
  },
];

export const FORM_USER_CREATE_INPUTS = [
  {
    name: "displayName",
    label: "Full Name",
    required: true,
    type: "text",
    rules: [{ required: true, message: "Please input your fullname!" }],
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    required: true,
    type: "tel",
    rules: [{ required: true, message: "Please input your fullname!" }],
  },
  {
    name: "email",
    label: "Email",
    required: true,
    type: "email",
    rules: [{ required: true, message: "Please input your email!" }],
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    rules: [{ required: true, message: "Please input your password!" }],
  },
];

export const FORM_USER_UPDATE_INPUTS = [
  {
    name: "displayName",
    label: "Full Name",
    required: true,
    type: "text",
    rules: [{ required: true, message: "Please input your fullname!" }],
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    required: true,
    type: "tel",
    rules: [{ required: true, message: "Please input your fullname!" }],
  },
  {
    name: "email",
    label: "Email",
    required: true,
    type: "email",
    rules: [{ required: true, message: "Please input your email!" }],
  },
];
