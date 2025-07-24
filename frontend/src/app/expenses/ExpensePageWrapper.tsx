"use client";
import FormModal from "@/components/FormModal";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import YearMonthSelect from "@/components/YearMonthSelect";
import { useQuery } from "@tanstack/react-query";
import { getExpense } from "../actions/expense.server";
import { getCurrentYearMonth } from "@/lib/utils";
import AmountSummary from "@/components/AmountSummary";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";


const ExpensePageWrapper = () => {
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", yearMonth],
    queryFn: () => getExpense(yearMonth),
  });

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
        <FormModal label="new expense">
          <ExpenseForm />
        </FormModal>
        <YearMonthSelect />
      </Box>
      <ExpenseTable records={expenses} />
    </div>
  );
};

export default ExpensePageWrapper;
