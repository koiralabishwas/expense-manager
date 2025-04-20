"use client";
import React from "react";
import TableView from "../TableView";
import { Session } from "next-auth";

interface Props {
  session: Session;
  expenses: Array<any>;
  onDelete : (id : string) => void
}
const ExpenseTable = ({ expenses, session , onDelete }: Props) => {
  const deleteExpense = (id: string) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    onDelete(id)
  };

  return <TableView records={expenses} deleteRecord={deleteExpense} />;
};

export default ExpenseTable;
