import React, { FC } from "react";
import { Modal } from "antd";

interface Props {
  modalTitle?: string;
  isModalOpen: boolean;
  children: React.ReactNode;
  showFooter?: boolean;
  setModalVisible: (visible: boolean) => void;
}

const Dialogue: FC<Props> = ({
  isModalOpen,
  modalTitle,
  children,
  showFooter = true,
  setModalVisible,
}) => {
  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onCancel={() => setModalVisible(!isModalOpen)}
      footer={showFooter ? true : null}
    >
      {children}
    </Modal>
  );
};

export default Dialogue;
