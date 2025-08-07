"use client";
import FormModal from "@/components/FormModal";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import YearMonthSelect from "@/components/YearMonthSelect";
import { useQuery } from "@tanstack/react-query";
import { ExpenseRes, ExpenseSummary, getExpense } from "../actions/expense.server";
import { getCurrentYearMonth } from "@/lib/utils";
import AmountSummary from "@/components/AmountSummary";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";


const ExpensePageWrapper = () => {
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

  const { data: expenses } = useQuery<ExpenseRes>({
    queryKey: ["expenses", yearMonth],
    queryFn: () => getExpense(yearMonth),
  });
  return (

    <div>
      {expenses && (
        <>
          <AmountSummary expenseSumarry={expenses.summary} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <FormModal label="出費を登録">
              <ExpenseForm />
            </FormModal>
            <YearMonthSelect />
          </Box>
          <ExpenseTable records={expenses.expenses} />
        </>
      )}
    </div>
  );
};

export default ExpensePageWrapper;
