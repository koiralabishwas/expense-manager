import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import IncomePageWrapper from "./IncomePageWrapper";
import { Typography } from "@mui/material";
import { getIncomes } from "@/lib/actions/incomes";
import { getCurrentYearMonth } from "@/lib/utils";

export default async function IncomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return <div>ログインが必要です</div>;
  }

  const currentYearMonth = getCurrentYearMonth();
  const incomes = getIncomes(currentYearMonth);

  return (
    <div>
      <Typography
        component={"h1"}
        variant="h5"
        textAlign={"center"}
        gutterBottom
        margin={"normal"}
      >
        収入登録
      </Typography>
      <IncomePageWrapper session={session} />
    </div>
  );
}
