import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Typography } from "@mui/material";

import ExpensePageWrapper from "./ExpensePageWrapper";
import { getExpense } from "@/lib/actions/expense";
import { getCurrnentYearMonth } from "@/lib/utils";
//TODO: need to implement react query 

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}
const page = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return <div>Login Needed</div>;
  }

  // Parse yearMonth from searchParams (assuming it's a query string)
  const yearMonth =
    searchParams.yearMonth?.toString() || getCurrnentYearMonth();
  const expenses = await getExpense(yearMonth);

  return (
    <div>
      <Typography
        component={"h1"}
        variant="h5"
        textAlign={"center"}
        gutterBottom
        margin={"normal"}
      >
        出費登録
      </Typography>
      <ExpensePageWrapper session={session} expenses={expenses} />
    </div>
  );
};

export default page;
