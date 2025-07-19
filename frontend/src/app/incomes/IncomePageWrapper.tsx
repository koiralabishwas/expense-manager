"use client";
import FormModal from "@/components/FormModal";
import React, { Suspense } from "react";
import PostIncome from "./PostIncome";
import TableView from "@/components/TableView";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteIncome, getIncomes } from "../actions/income.server";
import { getCurrentYearMonth } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import YearMonthSelect from "@/components/YearMonthSelect";
import { Box } from "@mui/material";
import AmountSummary from "@/components/AmountSummary";
import IncomeForm from "@/components/IncomeForm";



const IncomePageWrapper = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

  // queries
  const { data: incomes = [] } = useQuery({
    queryKey: ["incomes", yearMonth],
    queryFn: () => getIncomes(yearMonth),
  });

  // handlers
  const handleDelete = async (id: string) => {
    const deleted = await deleteIncome(id)
    if (deleted._id)
      queryClient.invalidateQueries({ queryKey: ["incomes", yearMonth]})
  };

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
        <FormModal>
          <PostIncome
            onPost={(newIncome: Income) => {
              queryClient.invalidateQueries({ queryKey: ["incomes", yearMonth] })
            }}
          />
        </FormModal>
        <YearMonthSelect />
        <FormModal label="new Income form">
          <IncomeForm
            onPost={(newIncome : Income) => {
              queryClient.invalidateQueries({queryKey : ["incomes" , yearMonth]})
            }}
          />
        </FormModal>
      </Box>
      <TableView records={incomes} deleteRecord={handleDelete} />
    </div>
  );
};

export default IncomePageWrapper;
