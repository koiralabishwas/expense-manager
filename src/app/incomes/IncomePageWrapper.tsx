"use client";
import FormModal from "@/components/FormModal";
import React, { Suspense } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { deleteIncome, getIncomes } from "../../server/income.server";
import { getCurrentYearMonth } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import YearMonthSelect from "@/components/YearMonthSelect";
import { Box } from "@mui/material";
import AmountSummary from "@/components/AmountSummary";
import IncomeForm from "@/components/IncomeForm";
import IncomeTable from "@/components/IncomeTable";
import { getUserData } from "@/server/preference.server";

const IncomePageWrapper = () => {
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

  const [userQuery, incomeQuery] = useQueries({
    queries: [
      {
        queryKey: ["user"],
        queryFn: () => getUserData(),
        staleTime: Infinity,
      },
      {
        queryKey: ["incomes", yearMonth],
        queryFn: () => getIncomes(yearMonth),
        staleTime: Infinity,
      },
    ],
  });

  const { data: user } = userQuery;// cached data is used in other nested conponents
  const { data: incomesRes } = incomeQuery;

  return (
    <div>
      {incomesRes && (
        <>
          <AmountSummary summary={incomesRes.summary} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <FormModal label="収入を登録">
              <IncomeForm />
            </FormModal>
            <YearMonthSelect />
          </Box>
          <Box
            sx={{
              px: 1,
            }}
          >
            <IncomeTable records={incomesRes.incomes} />
          </Box>
        </>
      )}
    </div>
  );
};

export default IncomePageWrapper;
