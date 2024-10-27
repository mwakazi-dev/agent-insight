"use client";

import React, { useState } from "react";
import { Button, Col, Form, Input, notification, Row } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { FORM_USER_CREATE_INPUTS } from "@/constants/data";
import { createUser } from "@/app/actions/admin";
import { addUser } from "@/slices/userSlice";

const CreateUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    setLoading(true);

    const { displayName, email, phoneNumber } = values;

    try {
      const res = await createUser(values);

      if (res.success) {
        dispatch(
          addUser({
            uid: res?.data?.id,
            email,
            displayName,
            phoneNumber,
          })
        );
        notification.success({
          message: "User created successfully!",
          placement: "top",
        });

        router.push("/admin");
      }
      if (!res.success) {
        notification.error({
          message: "Unable to create user!",
          placement: "top",
        });
      }
      setLoading(false);
    } catch (error) {
      notification.error({
        message: "Error creating user",
        placement: "top",
      });
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle">
      <Col span={8}>
        <Form name="create-user" layout="vertical" onFinish={handleFinish}>
          {FORM_USER_CREATE_INPUTS.map((input) => (
            <Form.Item
              key={input.name}
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
          ))}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              disabled={loading}
            >
              Create User
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateUser;
