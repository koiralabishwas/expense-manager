"use client";
import FormModal from "@/components/FormModal";
import React from "react";
import PostExpense from "./PostExpense";
import TableView from "@/components/TableView";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import YearMonthSelect from "@/components/YearMonthSelect";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteExpense, getExpense } from "../actions/expense.server";
import { getCurrentYearMonth } from "@/lib/utils";
import AmountSummary from "@/components/AmountSummary";
import ExpenseForm from "@/components/expenses/ExpenseForm";


const ExpensePageWrapper = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", yearMonth],
    queryFn: () => getExpense(yearMonth),
  });

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    queryClient.invalidateQueries({ queryKey: ['expenses', yearMonth] })
  };

  return (
    <div>
      <AmountSummary records={expenses} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <FormModal>
          <PostExpense
            onPost={(newExpense: Expense) => {
              queryClient.invalidateQueries({ queryKey: ['expenses', yearMonth] });
            }}
          />
        </FormModal>
        <YearMonthSelect />
        <FormModal label="new expense form">
          <ExpenseForm onPost={(newExpense: Expense) => {
            // queryClient.invalidateQueries({ queryKey: ['expenses', yearMonth] });
            console.log(newExpense)
          }}></ExpenseForm>
        </FormModal>
      </Box>
      <TableView records={expenses} deleteRecord={handleDelete} />
    </div>
  );
};

export default ExpensePageWrapper;
