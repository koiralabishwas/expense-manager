"use client";
import FormModal from "@/components/FormModal";
import React, { Suspense } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteIncome, getIncomes } from "../actions/income.server";
import { getCurrentYearMonth } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import YearMonthSelect from "@/components/YearMonthSelect";
import { Box } from "@mui/material";
import AmountSummary from "@/components/AmountSummary";
import IncomeForm from "@/components/IncomeForm";
import IncomeTable from "@/components/IncomeTable";



const IncomePageWrapper = () => {
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

  const { data: incomes = [] } = useQuery({
    queryKey: ["incomes", yearMonth],
    queryFn: () => getIncomes(yearMonth),
  });

  return (
    <div>
      <AmountSummary records={incomes} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <FormModal label="収入を登録">
          <IncomeForm/>
        </FormModal>
        <YearMonthSelect />
      </Box>
      <IncomeTable records={incomes} />
    </div>
  );
};

export default IncomePageWrapper;
