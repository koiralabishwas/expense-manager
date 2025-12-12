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
import EditIncomeModal from "./EditIncomeModal";
import { incomeGenreLabels } from "@/lib/constants/genre";

export type Column = {
  _id: string;
  description: string;
  amount: number;
  genre: string;
  createdAt: string;
};

interface Props {
  records: Income[];
  edit?: (id: string) => void;
}

const columnLabels: Partial<Record<keyof Column, string>> = {
  genre: "種類",
  amount: "金額",
  description: "概要",
  createdAt: "日付",
};

const columnKeys = Object.keys(columnLabels) as (keyof Column)[];

const IncomeTable = ({ records }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState<Income | null>(null);

  const handleOpenModal = (record: Income) => {
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
                }}
                onClick={() => handleOpenModal(record)}
                hover
              >
                <TableCell>{incomeGenreLabels[record.genre]}</TableCell>
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
        <EditIncomeModal openModal={showEditModal} record={selectedModal} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default IncomeTable;
