import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Typography } from "@mui/material";

import ExpensePageWrapper from "./ExpensePageWrapper";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return <div>Login Needed</div>;
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/api/expenses",
    {
      //TODO: I need to know more about this bearer thing
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: "no-store",
    }
  );

  // TODO: add types ?
  const expenses = await res.json();

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
