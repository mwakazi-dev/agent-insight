"use client";
import React from "react";
import { Col, Row } from "antd";

import ReportFilters from "@/components/ReportFilters";
import RealTimeMap from "@/components/RealTimeMap";
import useAgents from "@/hooks/useAgents";

const DashboardPage = () => {
  const { agents } = useAgents();

  return (
    <div>
      <Row>
        <Col span={24}>
          <ReportFilters />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <RealTimeMap agents={agents as any} />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
