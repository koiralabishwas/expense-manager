"use server";
import { IncomeForm } from "@/components/IncomeForm";
import connectDB from "@/configs/db";
import { authOptions } from "@/lib/auth";
import Income from "@/models/income";
import { DateTime } from "luxon";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";

export async function getIncomes(yearMonth: string): Promise<IncomeRes> {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = new Types.ObjectId(session?.user._id);

  let startDate: DateTime | null = null;
  let endDate: DateTime | null = null;

  if (yearMonth) {
    startDate = DateTime.fromFormat(yearMonth, "yyyyMM", {
      zone: "Asia/Tokyo",
    }).startOf("month");
    endDate = startDate.plus({ months: 1 }); // fixed to "months" for consistency
  }

  const dateFilter =
    startDate && endDate
      ? { date: { $gte: startDate.toJSDate(), $lt: endDate.toJSDate() } }
      : {};

  const incomes = await Income.find({
    userId: userId,
    ...dateFilter,
  }).sort({ date: -1 });

  // Single pass for summary
  const summary = {
    total: 0,
    genres: {} as Record<string, number>,
  };

  for (const inc of incomes) {
    const amount = inc.amount || 0;
    summary.total += amount;
    summary.genres[inc.genre] = (summary.genres[inc.genre] || 0) + amount;
  }

  return JSON.parse(
    JSON.stringify({
      yearMonth,
      incomes,
      summary,
    })
  );
}

export async function postIncome(income: IncomeForm): Promise<Income> {
  const session = await getServerSession(authOptions);
  const newUserIncome = await new Income({
    userId: session?.user._id,
    date: income.date,
    description: income.description,
    amount: income.amount,
    genre: income.genre,
  }).save();

  return JSON.parse(JSON.stringify(newUserIncome));
}

export async function putIncome(
  _id: string,
  expense: IncomeForm
): Promise<Income> {
  const session = await getServerSession(authOptions);
  const changedUserIncome = await Income.findOneAndUpdate(
    { _id: _id, userId: session?.user._id },
    expense,
    { new: true, runValidators: true }
  );

  return JSON.parse(JSON.stringify(changedUserIncome));
}

export async function deleteIncome(id: string): Promise<Income> {
  const session = await getServerSession(authOptions);
 const deletedUserIncome = await Income.findOneAndDelete({
      _id: id,
      userId: session?.user._id,
    });
  return JSON.parse(JSON.stringify(deletedUserIncome))
}
