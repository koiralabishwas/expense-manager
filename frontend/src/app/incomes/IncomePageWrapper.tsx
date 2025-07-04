"use client";
import FormModal from "@/components/FormModal";
import React from "react";
import PostIncome from "./PostIncome";
import TableView from "@/components/TableView";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteIncome, getIncomes } from "@/lib/actions/incomes";
import { getCurrentYearMonth } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import YearMonthSelect from "@/components/YearMonthSelect";
import { Box } from "@mui/material";



const IncomePageWrapper = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

  const { data } = useQuery({
    queryKey: ["incomes", yearMonth],
    queryFn: () => getIncomes(yearMonth),
  });
  const incomes = Array.isArray(data) ? data : [];

  const handleDelete = async (id: string) => {
    const deleted = await deleteIncome(id)
    if (deleted._id)
    queryClient.setQueryData(['incomes', yearMonth], (oldData: any) => {
      return oldData.filter((income: any) => income._id !== deleted._id)
    })
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
          <PostIncome
            onPost={(newIncome: any) => {
              queryClient.setQueryData(['incomes', yearMonth], (oldData: any) => {
                return [...oldData, newIncome]
              })
            }}
          />
        </FormModal>
        <YearMonthSelect />
      </Box>
      <TableView records={incomes} deleteRecord={handleDelete} />
    </div>
  );
};

export default IncomePageWrapper;
