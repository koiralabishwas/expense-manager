"use client";
import FormModal from "@/components/FormModal";
import { Session } from "next-auth";
import React, { useState } from "react";
import PostIncome from "./PostIncome";
import TableView from "@/components/TableView";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { getIncomes } from "@/lib/actions/incomes";
import { getCurrentYearMonth } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";
import YearMonthSelect from "@/components/YearMonthSelect";
import { Box } from "@mui/material";

interface Props {
  session: Session
}

const IncomePageWrapper = ({ session }: Props) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();
  const { data: incomes = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["incomes", yearMonth],
    queryFn: () => getIncomes(yearMonth),
  });
  console.log(incomes)

  const handleDelete = async (id: string) => {
    const deleted = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        }
      }
    );
    if (deleted.ok)
    queryClient.setQueryData(['incomes', yearMonth], (oldData: any) => {
      return oldData.filter((income: any) => income._id !== id)
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
