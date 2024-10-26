import React, { FC } from "react";
import { Modal } from "antd";

interface Props {
  modalTitle?: string;
  isModalOpen: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  children: React.ReactNode;
  showFooter?: boolean;
}

const Dialogue: FC<Props> = ({
  isModalOpen,
  handleOk = () => null,
  handleCancel = () => null,
  modalTitle,
  children,
  showFooter = true,
}) => {
  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={showFooter ? true : null}
    >
      {children}
    </Modal>
  );
};

export default Dialogue;
