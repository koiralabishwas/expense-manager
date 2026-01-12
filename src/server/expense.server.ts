"use server";
import { ExpenseForm } from "@/components/ExpenseForm";
import connectDB from "@/configs/db";
import { authOptions } from "@/lib/auth";
import Expense from "@/models/expense";
import { DateTime } from "luxon";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";

export async function getExpense(yearMonth: string): Promise<ExpenseRes> {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  const userObjectId = new Types.ObjectId(session?.user._id);

  let startDate: DateTime | null = null;
  let endDate: DateTime | null = null;
  if (yearMonth) {
    startDate = DateTime.fromFormat(yearMonth, "yyyyMM", {
      zone: "Asia/Tokyo",
    }).startOf("month");
    endDate = startDate.plus({ months: 1 });
  }

  const dateFilter =
    startDate && endDate
      ? { date: { $gte: startDate.toJSDate(), $lt: endDate.toJSDate() } }
      : {};

  const expenses = await Expense.find({
    userId: userObjectId,
    ...dateFilter,
  }).sort({ date: -1 });

  // Single pass calculation
  const summary = {
    total: 0,
    cashPaid: 0,
    postPaid: 0,
    genre: {} as Record<string, number>,
  };

  for (const ex of expenses) {
    const amount = ex.amount || 0;
    summary.total += amount;
    if (ex.isPostPaid) summary.postPaid += amount;
    else summary.cashPaid += amount;
    summary.genre[ex.genre] = (summary.genre[ex.genre] || 0) + amount;
  }

  // Aggregation for prevMonthPostPaid
  const prevMonthPostPaid =
    startDate && endDate
      ? (
          await Expense.aggregate([
            {
              $match: {
                userId: userObjectId,
                isPostPaid: true,
                date: {
                  $gte: startDate.minus({ months: 1 }).toJSDate(),
                  $lt: endDate.minus({ months: 1 }).toJSDate(),
                },
              },
            },
            { $group: { _id: null, total: { $sum: "$amount" } } },
          ])
        )[0]?.total || 0
      : 0;

  const cashLoss = summary.cashPaid + prevMonthPostPaid;

  // next js does not accepts hiddden mongodb functions . this removes those hidden mongodb functions
  return JSON.parse(
    JSON.stringify({
      yearMonth,
      expenses,
      summary: {
        ...summary,
        prevMonthPostPaid,
        cashLoss,
      },
    })
  );
}

export async function postExpense(expense: ExpenseForm): Promise<Expense> {
  await connectDB();
  const session = await getServerSession(authOptions);
  const newUserExpense = await new Expense({
    userId: session?.user._id,
    date: expense.date,
    description: expense.description,
    amount: expense.amount,
    genre: expense.genre,
    isPostPaid: expense.isPostPaid,
  }).save();

  return JSON.parse(JSON.stringify(newUserExpense));
}

export async function putExpense(
  _id: string,
  expense: ExpenseForm
): Promise<Expense> {
  await connectDB();
  const session = await getServerSession(authOptions);
  const changedUserExpense = await Expense.findOneAndUpdate(
    { _id: _id, userId: session?.user._id },
    expense,
    { new: true, runValidators: true }
  );
  return JSON.parse(JSON.stringify(changedUserExpense));
}

export async function deleteExpense(id: string): Promise<Expense> {
  await connectDB();
  const session = await getServerSession(authOptions);
  const deletedUserExpense = await Expense.findOneAndDelete({
    _id: id,
    userId: session?.user._id,
  });
  return JSON.parse(JSON.stringify(deletedUserExpense))
}
