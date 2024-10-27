"use client";
import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  TableColumnsType,
  Tooltip,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import { CloseOutlined, EyeOutlined, UnlockFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import DataTable from "@/components/Table";
import { RootState } from "@/store/store";
import { UserDataType } from "@/types/user";
import Dialogue from "@/components/Dialogue";
import useModal from "@/hooks/useModal";
const UsersPage = () => {
  const router = useRouter();
  const users = useSelector((state: RootState) => state.user.users);

  const { modalVisible, setModalVisible } = useModal();

  const deleteHandler = (record: UserDataType) => {
    // Call your API to delete the user
    // You can use the uid to delete the user from the database
  };

  const changePasswordHandler = (record: UserDataType) => {};

  const changePasswordSubmitHandler = (values: any) => {};

  const rowClickHandler = (record: UserDataType) => {
    router.push(`/admin/user/edit/${record?.uid}`);
  };

  const COLUMNS: TableColumnsType<UserDataType> = [
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
      align: "center",
      render: (_, record) => (
        <>{record.displayName ? record.displayName : "-"}</>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      align: "center",
      render: (_, record) => (
        <>{record.phoneNumber ? record.phoneNumber : "-"}</>
      ),
    },
    {
      title: "Action",
      dataIndex: "operation",
      align: "center",
      render: (_, record) => (
        <>
          <Row justify="center" align="middle" gutter={[12, 16]}>
            <Col>
              <Tooltip placement="bottom" title="Delete user">
                <Button
                  icon={<CloseOutlined style={{ color: "red" }} />}
                  size="small"
                  type="text"
                  onClick={() => deleteHandler(record)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip placement="bottom" title="Change user password">
                <Button
                  icon={<UnlockFilled />}
                  type="text"
                  size="small"
                  onClick={() => changePasswordHandler(record)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip placement="bottom" title="View details">
                <Button
                  icon={<EyeOutlined />}
                  type="text"
                  size="small"
                  onClick={() => rowClickHandler(record)}
                />
              </Tooltip>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
      <Dialogue modalTitle="Change Password" isModalOpen={modalVisible}>
        <Row>
          <Col>
            <Form
              name="change-password"
              onFinish={changePasswordSubmitHandler}
              layout="vertical"
            >
              <Form.Item
                name="password"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long!",
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Dialogue>

      <Row>
        <Col>
          <Typography.Title level={4}>Users</Typography.Title>
        </Col>
      </Row>
      <Row justify="end" style={{ marginBottom: "8px" }}>
        <Col>
          <Button
            type="primary"
            onClick={() => router.push("/admin/user/create")}
          >
            Add User
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DataTable columns={COLUMNS} data={users} />
        </Col>
      </Row>
    </>
  );
};

export default UsersPage;
