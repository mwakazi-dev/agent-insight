"use client";
import React from "react";
import { Button, Col, Form, Input, Row } from "antd";

import { FORM_USER_CREATE_INPUTS } from "@/constants/data";

const CreateUser = () => {
  return (
    <Row justify="center" align="middle">
      <Col span={8}>
        <Form name="create-user" layout="vertical">
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
            <Button type="primary" htmlType="submit" block size="large">
              Create User
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateUser;
