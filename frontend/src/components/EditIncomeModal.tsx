"use client";

import { Box, Button, Modal } from "@mui/material";
import React from "react";
import ConfirmModal from "./ConfirmModal";
import { getCurrentYearMonth } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { deleteIncome } from "@/app/actions/income.server";
import EditIncomeForm from "./EditIncomeForm";

interface Props {
  openModal: boolean;
  record: Income;
  onClose: () => void;
}

const EditIncomeModal = ({ openModal, record, onClose }: Props) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

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
        <ConfirmModal label="Delete" confirmMessage="削除しますか？">
          <Button
            variant="outlined"
            sx={{
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "green",
              color: "green",
            }}
            color="primary"
            onClick={async (e) => {
              e.stopPropagation(); // Prevent triggering row click

              await deleteIncome(record._id);
              queryClient.invalidateQueries({ queryKey: ['incomes', yearMonth] })
              onClose();
            }}
          >
            Delete
          </Button>
        </ConfirmModal>
        <EditIncomeForm record={record}
        setOpenModal={onClose} />
      </Box>
    </Modal>
  );
};

export default EditIncomeModal;
