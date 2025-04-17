import { getServerSession } from "next-auth";
import Link from "@mui/material/Link";
import { Box, Button } from "@mui/material";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div>
      Hello, {session?.user.name || "Guest"}!
      <Box p={"3rem"}>
        <Button LinkComponent={"a"} href="/incomes" sx={{my: "1rem"}} variant="outlined" fullWidth>
          Income
        </Button>
        <Button LinkComponent={"a"} href="/expenses" sx={{my : "1rem"}} variant="outlined" fullWidth>
          Expenses
        </Button>
      </Box>
    </div>
  );
}
