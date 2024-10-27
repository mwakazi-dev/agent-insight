import React from "react";
import { Table } from "antd";
import { render, screen } from "@testing-library/react";

import DataTable from "@/components/Table";

jest.mock("antd", () => ({
  Table: jest.fn(({ columns, dataSource, loading }) => (
    <div data-testid="mock-table">
      {loading && <div data-testid="loading-indicator">Loading...</div>}
      <div data-testid="row-count">{dataSource.length}</div>
      <div data-testid="column-count">{columns.length}</div>
    </div>
  )),
}));

describe("DataTable", () => {
  const mockColumns = [
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
  ];

  const mockData = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the table component with provided columns and data", () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    expect(Table).toHaveBeenCalledWith(
      expect.objectContaining({
        columns: mockColumns,
        dataSource: mockData,
      }),
      expect.any(Object)
    );
  });

  it("displays loading state when loading prop is true", () => {
    render(<DataTable columns={mockColumns} data={mockData} loading={true} />);
    expect(Table).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: true,
      }),
      expect.any(Object)
    );
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("renders table with empty data array", () => {
    render(<DataTable columns={mockColumns} data={[]} />);
    expect(screen.getByTestId("row-count")).toHaveTextContent("0");
  });

  it("renders table with empty columns array", () => {
    render(<DataTable columns={[]} data={mockData} />);
    expect(screen.getByTestId("column-count")).toHaveTextContent("0");
  });
});
