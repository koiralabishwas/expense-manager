"use client";
import FormModal from "@/components/FormModal";
import React, { useState } from "react";
import PostExpense from "./PostExpense";
import { Session } from "next-auth";
import TableView from "@/components/TableView";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import YearMonthSelect from "@/components/YearMonthSelect";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getExpense } from "@/lib/actions/expenses";
import { getCurrentYearMonth } from "@/lib/utils";


const ExpensePageWrapper = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();

  const { data } = useQuery({
    queryKey: ["expenses", yearMonth],
    queryFn: () => getExpense(yearMonth),
  });
  const expenses = Array.isArray(data) ? data : [];

  const handleDelete = async (id: string) => {
    // const deleted = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: `Bearer ${session.accessToken}`,
    //   },
    // });
    // if (deleted.ok)
    // setExpenses((prev) => prev.filter((i) => i._id !== id));
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
            onPost={(newExpense: any) => {
              queryClient.setQueryData(['expense', yearMonth], (oldData: any) => {
                return [...oldData, newExpense]
              })
            }}
          />
        </FormModal>
        <YearMonthSelect />
      </Box>
      <TableView records={expenses} deleteRecord={handleDelete} />
    </div>
  );
};

export default ExpensePageWrapper;
