"use client";
import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { Edit } from "@mui/icons-material";
import EditRecordModal from "./EditRecordModal";

export type Column = {
  _id: string;
  description: string;
  amount: number;
  genre: string;
  createdAt: string;
};

type Transaction = Column | Income | Expense;

interface Props {
  records: Transaction[];
  edit?: (id: string) => void;
  deleteRecord: (id: string) => void;
}

const columnLabels: Partial<Record<keyof Column, string>> = {
  genre: "Genre",
  amount: "Amount",
  description: "Description",
  createdAt: "Date",
};

const columnKeys = Object.keys(columnLabels) as (keyof Column)[];

const TableView = ({ deleteRecord, records }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState<Transaction | null>(null);

  const handleOpenModal = (record: Transaction) => {
    setSelectedModal(record);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedModal(null);
    setShowEditModal(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="record table">
          <TableHead>
            <TableRow>
              {columnKeys.map((column) => (
                <TableCell key={column}>{columnLabels[column]}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  ":hover": { cursor: "pointer" },
                }}
                onClick={() => handleOpenModal(record)}
                hover
              >
                <TableCell>{record.genre}</TableCell>
                <TableCell>{record.amount}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>
                  {new Date(record.createdAt).toLocaleDateString("sv-SE").replace(/-/g, "/")}
                </TableCell>
                <TableCell>
                  <ConfirmModal label="Delete" confirmMessage="Click to delete">
                    <Button
                      variant="outlined"
                      sx={{
                        borderWidth: 2,
                        borderStyle: "solid",
                        borderColor: "green",
                        color: "green",
                      }}
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering row click
                        deleteRecord(record._id);
                      }}
                    >
                      Delete
                    </Button>
                  </ConfirmModal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showEditModal && selectedModal && (
        <EditRecordModal openModal={showEditModal} record={selectedModal} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default TableView;
