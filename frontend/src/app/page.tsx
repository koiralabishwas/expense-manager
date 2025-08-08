import { getServerSession } from "next-auth";
import { Box, Button } from "@mui/material";
import YearMonthSelect from "@/components/YearMonthSelect";
import SummaryTable from "@/components/SummaryTable";
import InDevelopmentAlert from "@/components/InDevelopmentAlert";

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
      <InDevelopmentAlert/>
      Hello, {session?.user.name || "Guest"}!
      <YearMonthSelect />
      <SummaryTable/>
      <Button LinkComponent={"a"} href="/incomes" variant="outlined" fullWidth>
        Income
      </Button>
      <Button LinkComponent={"a"} href="/expenses" variant="outlined" fullWidth>
        Expenses
      </Button>
    </Box >
  );
}
