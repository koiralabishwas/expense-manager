'use client'
import { getBalanceSummary } from "@/app/actions/summary.server";
import { getCurrentYearMonth } from "@/lib/utils";
import { Divider, Typography } from "@mui/material";
import { Box, display } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function BSSummaryTable() {
  const searchParams = useSearchParams();
  const yearMonth = searchParams.get("yearMonth") || getCurrentYearMonth();
  const { data: balance } = useQuery<BalanceSumarry>({
    queryKey: ["balanceSummary", yearMonth],
    queryFn: () => getBalanceSummary(yearMonth),
  });

  return (
    <>
      {balance && (
        <>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            純額 : {balance.netAmount}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Typography>収入</Typography>
              <Typography>{balance.totalIncome}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Box>
              <Typography>支出</Typography>
              <Typography>{balance.totalExpense}</Typography>
            </Box>
          </Box>
        </>
      )
      }
    </>
  );
}
