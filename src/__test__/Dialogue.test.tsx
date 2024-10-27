import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Dialogue from "@/components/Dialogue";
import { Modal } from "antd";

jest.mock("antd", () => ({
  Modal: jest.fn(({ children, title, onCancel }) => (
    <div>
      {title && <div>{title}</div>}
      <button onClick={onCancel}>Cancel</button>
      {children}
    </div>
  )),
}));

describe("Dialogue", () => {
  const mockSetModalVisible = jest.fn();
  const modalTitle = "Test Modal";
  const modalContent = "Test Content";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal with title when provided", () => {
    render(
      <Dialogue
        isModalOpen={true}
        modalTitle={modalTitle}
        setModalVisible={mockSetModalVisible}
      >
        {modalContent}
      </Dialogue>
    );
    expect(screen.getByText(modalTitle)).toBeInTheDocument();
  });

  it("renders modal content correctly", () => {
    render(
      <Dialogue isModalOpen={true} setModalVisible={mockSetModalVisible}>
        {modalContent}
      </Dialogue>
    );
    expect(screen.getByText(modalContent)).toBeInTheDocument();
  });

  it("calls setModalVisible when modal is cancelled", () => {
    render(
      <Dialogue isModalOpen={true} setModalVisible={mockSetModalVisible}>
        {modalContent}
      </Dialogue>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });

  it("renders modal without footer when showFooter is false", () => {
    render(
      <Dialogue
        isModalOpen={true}
        setModalVisible={mockSetModalVisible}
        showFooter={false}
      >
        {modalContent}
      </Dialogue>
    );

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        footer: null,
      }),
      expect.any(Object)
    );
  });
});
