import { getServerSession } from "next-auth";
import PostIncome from "./PostIncome";
import { Typography } from "@mui/material";
import { authOptions } from "../lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return <div>ログインが必要です</div>;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/incomes`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  });

  const incomes = await res.json();

  return (
    <div>
      <h2>収入一覧</h2>
      {incomes.map((income: any) => (
        <Typography key={income._id} >{income.description} - {income.amount} - {income.currency}</Typography>
      ))}
      <PostIncome />
    </div>
  );
}
