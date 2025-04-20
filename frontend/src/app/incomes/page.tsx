import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import IncomePageWrapper from "./IncomePageWrapper";
import {Typography} from "@mui/material";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return <div>ログインが必要です</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: "no-store",
    }
  );

  const incomes = await res.json();

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
      <IncomePageWrapper session={session} initialIncomes={incomes} />
    </div>
  );
}
