"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import EditExpenseModal from "./EditExpenseModal";

export type Column = {
  _id: string;
  description: string;
  amount: number;
  genre: string;
  createdAt: string;
};


interface Props {
  records: Expense[];
  edit?: (id: string) => void;
}

const columnLabels: Partial<Record<keyof Column, string>> = {
  genre: "Genre",
  amount: "Amount",
  description: "Description",
  createdAt: "Date",
};

const columnKeys = Object.keys(columnLabels) as (keyof Column)[];

const ExpenseTable = ({ records }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState<Expense | null>(null);

  const handleOpenModal = (record: Expense) => {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  ":hover": { cursor: "pointer" },
                  backgroundColor: record.isPostPaid === true ? "#dbcdcdff" : undefined,
                }}
                onClick={() => handleOpenModal(record)}
                hover
              >
                <TableCell>{record.genre}</TableCell>
                <TableCell>{record.amount}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>
                  {new Date(record.date).toLocaleDateString("sv-SE").replace(/-/g, "/")}
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showEditModal && selectedModal && (
        <EditExpenseModal openModal={showEditModal} record={selectedModal} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ExpenseTable;
