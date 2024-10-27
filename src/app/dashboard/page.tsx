"use client";
import React, { useState } from "react";
import { Col, notification, Row } from "antd";

import ReportFilters from "@/components/ReportFilters";
import RealTimeMap from "@/components/RealTimeMap";
import useAgents from "@/hooks/useAgents";
import { fetchReports } from "../actions/admin";
import exportToCSV from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const DashboardPage = () => {
  const { agents } = useAgents();
  const users = useSelector((state: RootState) => state.user.users);

  const [loading, setLoading] = useState(false);

  const generateReport = async (filters: any) => {
    setLoading(true);
    try {
      const res: any = await fetchReports(filters);
      console.log(res);
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

  return (
    <div>
      <Row>
        <Col span={24}>
          <ReportFilters
            onGenerateReport={generateReport}
            loading={loading}
            users={users.map((user) => ({
              key: user.id,
              label: user.email,
              value: user.id,
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
