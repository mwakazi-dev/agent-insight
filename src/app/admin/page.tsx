"use client";
import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Popconfirm,
  Row,
  TableColumnsType,
  Tooltip,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  UnlockFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

import DataTable from "@/components/Table";
import { RootState } from "@/store/store";
import { UserDataType } from "@/types/user";
import Dialogue from "@/components/Dialogue";
import useModal from "@/hooks/useModal";
import { changeUserPassword, deleteUser } from "@/app/actions/admin";
import { removeUser, setSelectedUser } from "@/slices/userSlice";
const UsersPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const user = useSelector((state: RootState) => state.user.user);

  const { modalVisible, setModalVisible } = useModal();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteHandler = async (record: UserDataType) => {
    setIsDeleting(true);

    try {
      const res = await deleteUser(record?.uid);

      if (res.success) {
        dispatch(removeUser(record?.uid));
        notification.success({
          message: "User deleted successfully!",
          placement: "top",
        });
      }
      if (!res.success) {
        notification.error({
          message: "Unable to create user!",
          placement: "top",
        });
      }
      setIsDeleting(false);
    } catch (error) {
      notification.error({
        message: "Error deleting user",
        placement: "top",
      });
      setIsDeleting(false);
    }
  };

  const changePasswordHandler = (record: UserDataType) => {
    dispatch(setSelectedUser(record));
    setModalVisible(true);
  };

  const changePasswordSubmitHandler = async (values: any) => {
    setIsUpdating(true);

    try {
      const res = await changeUserPassword(user?.uid, values.password);

      if (res.success) {
        notification.success({
          message: `${user?.displayName} password changed successfully!`,
          placement: "top",
        });
      }
      if (!res.success) {
        notification.error({
          message: "Unable to update user password!",
          placement: "top",
        });
      }
      setIsUpdating(false);
      setModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error updating user password!",
        placement: "top",
      });

      setIsUpdating(false);
      setModalVisible(false);
    }
  };

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
              <Popconfirm
                title="Delete the user"
                description="Are you sure?"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => deleteHandler(record)}
                okButtonProps={{ loading: isDeleting }}
              >
                <Tooltip placement="bottom" title="Delete user">
                  <Button
                    icon={<CloseOutlined style={{ color: "red" }} />}
                    size="small"
                    type="text"
                  />
                </Tooltip>
              </Popconfirm>
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
      <Dialogue
        modalTitle={`Change password for ${user?.displayName}`}
        isModalOpen={modalVisible}
        setModalVisible={setModalVisible}
      >
        <Row justify="center" align="middle" style={{ marginTop: "24px" }}>
          <Col span={12}>
            <Form
              name="password"
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
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isUpdating}
                  disabled={isUpdating}
                >
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
