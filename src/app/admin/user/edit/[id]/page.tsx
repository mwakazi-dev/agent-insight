"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  Form,
  Grid,
  Input,
  notification,
  Row,
  Typography,
} from "antd";

import { selectUserById, updateUser } from "@/slices/userSlice";
import { RootState } from "@/store/store";
import { FORM_USER_UPDATE_INPUTS } from "@/constants/data";
import { updateUserDetails } from "@/app/actions/admin";
import useAuth from "@/hooks/useAuth";

const EditUser = ({ params }: { params: { id: string } }) => {
  const user = useSelector((state: RootState) =>
    selectUserById(state, params.id)
  );
  const dispatch = useDispatch();

  const { authState } = useAuth();

  const [loading, setLoading] = useState(false);
  const screen = Grid.useBreakpoint();

  const handleFinish = async (values: any) => {
    setLoading(true);

    let payload: any = {};
    for (const key in values) {
      if (values[key] !== user[key]) {
        payload[key] = values[key];
      }
    }

    try {
      const res = await updateUserDetails!(params.id, payload);

      if (res.success) {
        dispatch(
          updateUser({
            uid: params.id,
            ...values,
          })
        );
        notification.success({
          message: "User updated successfully!",
          placement: "top",
        });
      }
      if (!res.success) {
        notification.error({
          message: "Unable to update user!",
          placement: "top",
        });
      }
      setLoading(false);
    } catch (error) {
      notification.error({
        message: "Error updating user!",
        placement: "top",
      });
      setLoading(false);
    }
  };

  return (
    <Row justify="center">
      <Col xs={24} md={12}>
        <Card
          style={{
            minHeight: "500px",
            width: !screen.xs ? "500px" : "100%",
            margin: "auto auto",
          }}
        >
          <Row
            justify="center"
            align="middle"
            style={{ marginBottom: "24px", margin: "16px auto" }}
          >
            <Col xs={24} md={18}>
              <Typography.Title level={3}>Update Details</Typography.Title>
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col xs={24} md={24}>
              <Form
                name="create-user"
                layout="vertical"
                initialValues={user}
                onFinish={handleFinish}
              >
                <Row justify="center">
                  {FORM_USER_UPDATE_INPUTS.map((input) => (
                    <Col key={input.name} xs={16} md={18}>
                      <Form.Item
                        name={input.name}
                        label={input.label}
                        rules={input.rules}
                      >
                        {input.type === "email" && (
                          <Input type="email" size="large" autoComplete="off" />
                        )}
                        {input.type === "password" && (
                          <Input.Password size="large" autoComplete="off" />
                        )}
                        {(input.type === "text" ||
                          input.type === "tel" ||
                          input.type === "displayName") && (
                          <Input size="large" autoComplete="off" />
                        )}
                      </Form.Item>
                    </Col>
                  ))}
                  <Col xs={24} md={18}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      style={{ backgroundColor: "#2F3645" }}
                      loading={loading}
                      disabled={loading}
                      size="large"
                    >
                      Update details
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default EditUser;
