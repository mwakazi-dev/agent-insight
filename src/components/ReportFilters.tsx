"use client";

import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import React from "react";

const ReportFilters = () => {
  const handleGenerateReport = (values: any) => {
    console.log("Generate Report", values);
  };
  return (
    <Row>
      <Col span={24}>
        <Form layout="vertical" onFinish={handleGenerateReport}>
          <Row justify="start" align="middle" gutter={[16, 16]}>
            <Col>
              <Form.Item name="dateRange">
                <DatePicker.RangePicker format="YYYY-MM-DD HH:mm" showTime />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="productType">
                <Select options={[]} placeholder="Product Type" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="fieldAgent">
                <Select
                  options={[]}
                  style={{ width: "100%" }}
                  placeholder="Field Agent"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="location">
                <Select
                  options={[]}
                  style={{ width: "100%" }}
                  placeholder="Location"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Generate Report
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default ReportFilters;
