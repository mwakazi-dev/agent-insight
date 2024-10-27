"use client";
import React, { useState } from "react";
import { Col, notification, Row, Typography } from "antd";

import ReportFilters from "@/components/ReportFilters";

import useAgents from "@/hooks/useAgents";
import { fetchReports } from "../actions/admin";
import exportToCSV from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import dynamic from "next/dynamic";

const RealTimeMap = dynamic(() => import("@/components/RealTimeMap"), {
  ssr: false,
});

const DashboardPage = () => {
  const { agents } = useAgents();
  const users = useSelector((state: RootState) => state.user.users);

  const [loading, setLoading] = useState(false);

  const isClient = typeof window !== "undefined";
  const generateReport = async (filters: any) => {
    setLoading(true);
    try {
      const res: any = await fetchReports(filters);

      if (res.success) {
        if (res.data?.report?.length > 0) {
          exportToCSV(res.data?.report as any);
          notification.success({
            message: "Report generated successfully!",
            placement: "top",
          });
        } else {
          notification.warning({
            message: "No data found for the selected filters",
            placement: "top",
          });
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error generating report",
        placement: "top",
      });
    }
  };

  if (!isClient) {
    return <Typography.Text>Loading...</Typography.Text>;
  }

  return (
    <div>
      <Row>
        <Col span={24}>
          <ReportFilters
            onGenerateReport={generateReport}
            loading={loading}
            users={users.map((user) => ({
              key: user.uid,
              label: user.email,
              value: user.email,
            }))}
          />
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
