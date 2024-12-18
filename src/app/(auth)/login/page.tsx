"use client";

import React from "react";
import { Button, Form, Input, Row, Col, Typography } from "antd";

import { StyledForm } from "@/styles/form";
import { FORM_INPUTS } from "@/constants/data";
import useAuth from "@/hooks/useAuth";
import Logo from "@/components/Logo";

const LoginPage: React.FC = () => {
  const { onLogin, isAuthenticating, authState } = useAuth();
  const onFinish = (values: any) => {
    const { email, password } = values;

    onLogin!(email, password) as any;
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={18} md={8}>
        <StyledForm name="login" onFinish={onFinish} layout="vertical">
          <Row style={{ marginBottom: "16px" }}>
            <Col span={24}>
              <Logo />
            </Col>
          </Row>
          <Row justify="center">
            <Col span={8}>
              <Typography.Title level={2}>Login</Typography.Title>
            </Col>
          </Row>
          <Row gutter={[16, 4]}>
            {FORM_INPUTS.map((input) => (
              <Col span={24} key={input.name}>
                <Form.Item
                  name={input.name}
                  label={input.label}
                  rules={input.rules}
                >
                  {input.type === "password" && <Input.Password size="large" />}
                  {input.type !== "password" && (
                    <Input size="large" type={input.type} autoComplete="off" />
                  )}
                </Form.Item>
              </Col>
            ))}
          </Row>

          {authState?.error && (
            <Row justify="center" style={{ marginBottom: "12px" }}>
              <Col>
                <Typography.Text type="danger">
                  {authState?.error}
                </Typography.Text>
              </Col>
            </Row>
          )}

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              size="large"
              loading={isAuthenticating}
              disabled={isAuthenticating}
              style={{ backgroundColor: "#2F3645" }}
            >
              Log in
            </Button>
          </Form.Item>
        </StyledForm>
      </Col>
    </Row>
  );
};

export default LoginPage;
