"use client";
import FormModal from "@/components/FormModal";
import React, { useState } from "react";
import PostExpense from "./PostExpense";
import { Session } from "next-auth";
import TableView from "@/components/TableView";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import YearMonthSelect from "@/components/YearMonthSelect";

interface Props {
  expenses: Array<any>;
  session: Session;
}

const ExpensePageWrapper = ({ session, expenses: initialExpenses }: Props) => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const searchParams = useSearchParams();

  const handleDelete = async (id: string) => {
    const deleted = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    if (deleted.ok)
    setExpenses((prev) => prev.filter((i) => i._id !== id));
  };
  
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <FormModal>
          <PostExpense
            onPost={(expense) => setExpenses((prev) => [...prev, expense])}
          />
        </FormModal>
       <YearMonthSelect />
      </Box>
      <TableView records={expenses} deleteRecord={handleDelete} />
    </div>
  );
};

export default ExpensePageWrapper;
