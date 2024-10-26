"use client";

import { FORM_DATA_COLLECTION_INPUTS } from "@/constants/data";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";

export default function Home() {
  return (
    <Row justify="center" align="middle">
      <Col span={8}>
        <Form name="create-user" layout="vertical">
          {FORM_DATA_COLLECTION_INPUTS.map((input) => (
            <Form.Item
              key={input.name}
              name={input.name}
              label={input.label}
              rules={input.rules}
            >
              {input.type === "select" && (
                <Select options={input.options} size="large" />
              )}
              {input.type === "textarea" && <Input.TextArea rows={4} />}

              {input.type === "datePicker" && (
                <DatePicker style={{ width: "100%" }} size="large" />
              )}
              {input.type === "timePicker" && (
                <DatePicker
                  style={{ width: "100%" }}
                  size="large"
                  picker="time"
                />
              )}
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
