"use client";
import ExpenseTable from "@/components/expenses/ExpenseTable";
import FormModal from "@/components/FormModal";
import React, { useState } from "react";
import PostExpense from "./PostExpense";
import { Session } from "next-auth";
import TableView from "@/components/TableView";

interface Props {
  expenses: Array<any>;
  session: Session;
}

const ExpensePageWrapper = ({ session, expenses: initialExpenses }: Props) => {
  const [expenses, setExpenses] = useState(initialExpenses);

  const handleDelete = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    setExpenses((prev) => prev.filter((i) => i._id !== id));
  };
  return (
    <div>
      <FormModal>
        <PostExpense
          onPost={(expense) => setExpenses((prev) => [...prev, expense])}
        />
      </FormModal>
      <TableView
        records={expenses} deleteRecord={handleDelete}
      />
    </div>
  );
};

export default ExpensePageWrapper;
