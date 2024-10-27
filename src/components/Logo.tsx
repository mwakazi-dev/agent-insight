import React from "react";
import { Col, Row, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const Logo = () => {
  return (
    <Row>
      <Col>
        <EnvironmentOutlined style={{ color: "red" }} />
      </Col>

      <Col>
        <Typography.Title
          level={4}
          style={{
            color: "grey",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          Agent Insight
        </Typography.Title>
      </Col>
    </Row>
  );
};

export default Logo;
