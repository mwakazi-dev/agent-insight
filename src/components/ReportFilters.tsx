"use client";

import React, { FC } from "react";
import { Button, Col, DatePicker, Form, Grid, Input, Row, Select } from "antd";

import { PRODUCT_TYPES } from "@/constants/data";

interface Props {
  onGenerateReport: (values: any) => void;
  loading: boolean;
  users: any[];
}

const ReportFilters: FC<Props> = ({ onGenerateReport, loading, users }) => {
  const screen = Grid.useBreakpoint();

  const isMobile = screen.xs;

  return (
    <Row>
      <Col span={24}>
        <Form layout="vertical" onFinish={onGenerateReport}>
          <Row justify="start" align="middle" gutter={[16, 4]}>
            <Col xs={24} md={4}>
              <Form.Item name="dateRange">
                <DatePicker.RangePicker format="YYYY-MM-DD HH:mm" showTime />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item name="productType">
                <Select options={PRODUCT_TYPES} placeholder="Product Type" />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item name="fieldAgent">
                <Select
                  options={users}
                  style={{ width: "100%" }}
                  placeholder="Field Agent"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item name="location">
                <Input placeholder="Location" />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                  block={isMobile}
                  size="large"
                  style={{ backgroundColor: "#2F3645" }}
                >
                  Generate report
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
