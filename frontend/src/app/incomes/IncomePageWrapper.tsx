"use client";
import FormModal from "@/components/FormModal";
import { Session } from "next-auth";
import React, { useState } from "react";
import PostIncome from "./PostIncome";
import TableView from "@/components/TableView";
import { useQuery } from "@tanstack/react-query";
import { getIncomes } from "@/lib/actions/incomes";
import { getCurrentYearMonth } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";

interface Props  {
  session : Session
}

const IncomePageWrapper = ({session }: Props) => {
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();
  const { data: incomes = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["incomes", yearMonth],
    queryFn: () => getIncomes(yearMonth),
  });
  console.log(incomes)

  const handleDelete = async (id: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes/${id}`,
      {
        method: "DELETE",
        headers : {
                  Authorization: `Bearer ${session.accessToken}`,

        }
        // Remove Authorization header or provide session if available
      }
    );

    // setColumns((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div>
      <FormModal>
        <PostIncome
          onPost={(newIncome: any) => {
            // setColumns((previous) => [...previous, newIncome]);[]
            
          }}
        />
      </FormModal>

        <TableView records={incomes} deleteRecord={handleDelete} />
      
    </div>
  );
};

export default IncomePageWrapper;
