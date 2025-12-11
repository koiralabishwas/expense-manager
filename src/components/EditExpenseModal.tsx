"use client";

import { Box, Button, Modal } from "@mui/material";
import React from "react";
import ConfirmModal from "./ConfirmModal";
import { deleteExpense } from "@/server/expense.server";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getCurrentYearMonth } from "@/lib/utils";
import EditExpenseForm from "./EditExpenseForm";

interface Props {
  openModal: boolean;
  record: Expense;
  onClose: () => void;
}

const EditExpenseModal = ({ openModal, record, onClose }: Props) => {
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
          width: "90%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2} gap={1}>
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

                await deleteExpense(record._id);
                queryClient.invalidateQueries({ queryKey: ['expenses', yearMonth] })
                onClose();
              }}
            >
              Delete
            </Button>
          </ConfirmModal>
          <Button color='warning' variant='outlined' sx={{ borderWidth: "0.3rem", borderRadius: "1rem", marginY: 2 }} onClick={() => onClose()}>close</Button>

        </Box>
        <EditExpenseForm
          record={record}
          setOpenModal={onClose}
        />
      </Box>
    </Modal>
  );
};

export default EditExpenseModal;
