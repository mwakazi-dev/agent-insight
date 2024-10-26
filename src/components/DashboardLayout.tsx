"use client";
import { Button, Col, Layout, Menu, Row, Typography } from "antd";
import React, { FC, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { SIDER_MENU } from "@/constants/data";
import useAuth from "@/hooks/useAuth";

interface Props {
  children: any;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  const { authState } = useAuth();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={SIDER_MENU as any}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ padding: 0, background: "#fff" }}>
          <Row>
            <Col span={23}>
              <Row justify="space-between">
                <Col>
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                </Col>
                <Col>
                  <Typography.Text type="secondary">
                    {authState?.username}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Layout.Header>
        <Layout.Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
