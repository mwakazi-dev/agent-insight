import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import ReportFilters from "@/components/ReportFilters";

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Grid: {
    useBreakpoint: () => ({
      xs: false,
      md: true,
    }),
  },
}));

const mockUsers = [
  { label: "User 1", value: "1" },
  { label: "User 2", value: "2" },
];

describe("ReportFilters", () => {
  const mockOnGenerateReport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user options correctly", async () => {
    render(
      <ReportFilters
        onGenerateReport={mockOnGenerateReport}
        loading={false}
        users={mockUsers}
      />
    );

    const fieldAgentSelect = await screen.findByText("Field Agent");
    fireEvent.mouseDown(fieldAgentSelect);

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.label)).toBeInTheDocument();
    });
  });
});
