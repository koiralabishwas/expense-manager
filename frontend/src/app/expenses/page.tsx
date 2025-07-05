import React from "react";
import { Typography } from "@mui/material";

import ExpensePageWrapper from "./ExpensePageWrapper";


export default async function ExpensePage() {

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
      <ExpensePageWrapper/>
    </div>
  );
};

