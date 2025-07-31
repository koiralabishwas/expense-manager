import { getServerSession } from "next-auth";
import { Box, Button } from "@mui/material";
import YearMonthSelect from "@/components/YearMonthSelect";
import BSTable from "@/components/BSSummaryTable";

export default async function Home() {
  const session = await getServerSession();
  return (
    <Box sx={{
      display: "grid",
      alignItems : "center",
      gridAutoFlow: "row",
      rowGap: 2,
      padding:2,
      width: "90%",
      placeItems : "center",
    }} >
      Hello, {session?.user.name || "Guest"}!
      <YearMonthSelect />
      <BSTable/>
      <Button LinkComponent={"a"} href="/incomes" variant="outlined" fullWidth>
        Income
      </Button>
      <Button LinkComponent={"a"} href="/expenses" variant="outlined" fullWidth>
        Expenses
      </Button>
    </Box >
  );
}
