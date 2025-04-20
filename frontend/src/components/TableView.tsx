"use client";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

type Column = {
  _id: string;
  description: string;
  amount: number;
  currency: string;
  genre: string;
  createdAt: string;
};

interface Props {
  records: Column[];
  edit?: (id: string) => void;
  deleteRecord: (id: string) => void;
}

const columnLabels: Partial<Record<keyof Column, string>> = {
  description: "Description",
  amount: "Amount",
  currency: "Currency",
  genre: "Genre",
  createdAt: "Date",
};
const columnKeys = Object.keys(columnLabels) as (keyof Column)[];

const TableView = ({ deleteRecord, records }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnKeys.map((column) => (
              <TableCell sx={{ textAlign: "left" }} key={column}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow
              key={record._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {record.description}
              </TableCell>
              <TableCell align="right">{record.amount}</TableCell>
              <TableCell align="right">{record.genre}</TableCell>
              <TableCell align="right">{record.currency}</TableCell>
              <TableCell align="right">
                {new Date(record.createdAt)
                  .toLocaleDateString("sv-SE")
                  .replace(/-/g, "/")}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    deleteRecord(record._id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
