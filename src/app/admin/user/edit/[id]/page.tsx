"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Col, Form, Input, Row } from "antd";

import { selectUserById } from "@/slices/userSlice";
import { RootState } from "@/store/store";
import { FORM_USER_UPDATE_INPUTS } from "@/constants/data";

const EditUser = ({ params }: { params: { id: string } }) => {
  const user = useSelector((state: RootState) =>
    selectUserById(state, params.id)
  );

  return (
    <Row justify="center" align="middle">
      <Col span={8}>
        <Form name="create-user" layout="vertical" initialValues={user}>
          {FORM_USER_UPDATE_INPUTS.map((input) => (
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
        </Form>
      </Col>
    </Row>
  );
};

export default EditUser;
