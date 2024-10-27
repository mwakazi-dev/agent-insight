import React from "react";
import { render, screen } from "@testing-library/react";
import Logo from "@/components/Logo";
import { EnvironmentOutlined } from "@ant-design/icons";

describe("Logo", () => {
  it("renders the logo component with correct text", () => {
    render(<Logo />);
    expect(screen.getByText("Agent Insight")).toBeInTheDocument();
  });

  it("renders the EnvironmentOutlined icon", () => {
    const { container } = render(<Logo />);
    const iconElement = container.querySelector(".anticon-environment");
    expect(iconElement).toBeInTheDocument();
  });
});
