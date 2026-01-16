"use client";
import FormModal from "@/components/FormModal";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import YearMonthSelect from "@/components/YearMonthSelect";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getCurrentYearMonth } from "@/lib/utils";
import AmountSummary from "@/components/AmountSummary";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";
import { getExpenses } from "../../server/expense.server";
import { getUserData } from "@/server/preference.server";


const ExpensePageWrapper = () => {
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

  const [userQuery , expenseQuery] = useQueries({
    queries : [
      {
        queryKey : ["user"],
        queryFn : () => getUserData(),
        staleTime : Infinity
      },
      {
        queryKey : ["expenses" , yearMonth],
        queryFn : () => getExpenses(yearMonth),
        staleTime : Infinity
      }
    ]
  })
  const {data : user} = userQuery;
  const {data : expenseRes} = expenseQuery; 

  return (

    <div>
      {expenseRes && (
        <>
          <AmountSummary summary={expenseRes.summary} />
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
          <Box
            sx={{
              px: 1
            }}
          >
            <ExpenseTable records={expenseRes.expenses} />
          </Box>
        </>
      )}
    </div>
  );
};

export default ExpensePageWrapper;
