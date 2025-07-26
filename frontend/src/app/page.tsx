import { getServerSession } from "next-auth";
import Link from "@mui/material/Link";
import { Box, Button } from "@mui/material";

export default async function Home() {
  const session = await getServerSession();
  return (
    <Box sx={{
      display: "grid",
      alignItems : "center",
      gridAutoFlow: "row",
      rowGap: 2,
      padding:2,
      width: "100%",
      placeItems : "center",
    }} >
      Hello, {session?.user.name || "Guest"}!
      <Button LinkComponent={"a"} href="/incomes" variant="outlined" fullWidth>
        Income
      </Button>
      <Button LinkComponent={"a"} href="/expenses" variant="outlined" fullWidth>
        Expenses
      </Button>
    </Box >
  );
}
