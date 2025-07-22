"use client";

import { Box, Modal } from "@mui/material";
import React from "react";
import { Column } from "./TableView";

interface Props {
  openModal: boolean;
  record: Column | Income | Expense;
  onClose: () => void;
}

const EditRecordModal = ({ openModal, record, onClose }: Props) => {
  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <div>{record._id}</div>
        <div>{record.description}</div>
        <div>{record.amount}</div>
        <div>{record.genre}</div>
        <div>{new Date(record.createdAt).toLocaleString()}</div>
      </Box>
    </Modal>
  );
};

export default EditRecordModal;
