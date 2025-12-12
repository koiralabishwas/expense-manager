import IncomePageWrapper from "./IncomePageWrapper";
import { Typography } from "@mui/material";
import InDevelopmentAlert from "@/components/InDevelopmentAlert";
import { Suspense } from "react";

export default async function IncomePage() {
  return (
    <div>
      <Suspense>
        <Typography
          component={"h1"}
          variant="h5"
          textAlign={"center"}
          gutterBottom
          margin={"normal"}
        >
          収入
        </Typography>
        <IncomePageWrapper />
      </Suspense>
    </div>
  );
}
