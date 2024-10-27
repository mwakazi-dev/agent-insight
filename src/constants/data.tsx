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
    path: "admin/dashboard",
    icon: <DashboardFilled />,
    label: "Dashboard",
  },
  {
    key: "2",
    path: "admin",
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

export const CATEGORIES = [
  { value: "categoryA", label: "Category A" },
  { value: "categoryB", label: "Category B" },
  { value: "categoryC", label: "Category C" },
  { value: "categoryD", label: "Category D" },
  { value: "categoryE", label: "Category E" },
  { value: "categoryF", label: "Category F" },
  { value: "categoryG", label: "Category G" },
];

export const PRODUCT_TYPES = [
  { value: "typeA", label: "Type A" },
  { value: "typeB", label: "Type B" },
  { value: "typeC", label: "Type C" },
  { value: "typeD", label: "Type D" },
  { value: "typeE", label: "Type E" },
];

export const FORM_DATA_COLLECTION_INPUTS = [
  {
    name: "productType",
    label: "Product Type",
    required: true,
    type: "select",
    options: PRODUCT_TYPES,
    rules: [{ required: true, message: "Please input your product type!" }],
  },
  {
    name: "category",
    label: "Category",
    required: true,
    type: "select",
    options: CATEGORIES,
    rules: [{ required: true, message: "Please input your category!" }],
  },
  {
    name: "description",
    label: "Description",
    required: true,
    type: "textarea",
    rules: [{ required: true, message: "Please input your description!" }],
  },
  {
    name: "feedback",
    label: "Feedback",
    required: false,
    type: "textarea",
  },
  {
    name: "nextAppointmentDate",
    label: "Next Appointment Date",
    required: true,
    type: "datePicker",
    rules: [
      { required: true, message: "Please input your next appointment date!" },
    ],
  },
];
