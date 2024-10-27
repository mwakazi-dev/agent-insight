"use client";
import { Button, Col, Layout, Menu, Row, Typography } from "antd";
import React, { FC, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { SIDER_MENU } from "@/constants/data";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Roles } from "@/types/enums";

interface Props {
  children: any;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  const { onLogout } = useAuth();
  const router = useRouter();
  const { authState } = useAuth();

  const [collapsed, setCollapsed] = useState(false);

  const handleSelect = (item: any) => {
    router.push(`/${SIDER_MENU[+item.key - 1].path}`);
  };

  const isAdmin = authState?.roles?.includes(Roles.ADMIN);

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
        {isAdmin && (
          <Menu
            theme="light"
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={SIDER_MENU as any}
            onSelect={handleSelect}
          />
        )}
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
                  <Row justify="center" align="middle">
                    <Col>
                      <Button
                        type="text"
                        icon={<LogoutOutlined style={{ fontSize: "20px" }} />}
                        onClick={onLogout}
                      >
                        Logout
                      </Button>
                    </Col>
                  </Row>
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
