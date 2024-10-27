"use client";

import React, { FC } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";

import { PRODUCT_TYPES } from "@/constants/data";

interface Props {
  onGenerateReport: (values: any) => void;
  loading: boolean;
  users: any[];
}

const ReportFilters: FC<Props> = ({ onGenerateReport, loading, users }) => {
  return (
    <Row>
      <Col span={24}>
        <Form layout="vertical" onFinish={onGenerateReport}>
          <Row justify="start" align="middle" gutter={[16, 16]}>
            <Col>
              <Form.Item name="dateRange">
                <DatePicker.RangePicker format="YYYY-MM-DD HH:mm" showTime />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="productType">
                <Select options={PRODUCT_TYPES} placeholder="Product Type" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="fieldAgent">
                <Select
                  options={users}
                  style={{ width: "100%" }}
                  placeholder="Field Agent"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="location">
                <Input placeholder="Location" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                >
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
