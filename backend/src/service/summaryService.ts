import { DateTime } from "luxon";
import { Types } from "mongoose";
import Expense from "../models/expense";
import Income from "../models/income";

export async function getMonthlyBalanceSummary(userId: string, yearMonth: string) {
  const startDate = DateTime.fromFormat(yearMonth, "yyyyMM", {
    zone: "Asia/Tokyo",
  }).startOf("month");
  const endDate = startDate.plus({ months: 1 });

  // string のままだと読み込まない
  const userObjectId = new Types.ObjectId(userId);

  const expenseAgg = await Expense.aggregate([
    {
      $match: {
        userId: userObjectId,
        date: { $gte: startDate.toJSDate(), $lt: endDate.toJSDate() },
      },
    },
    {
      $group: {
        _id: null,
        totalExpense: { $sum: "$amount" },
      },
    },
  ]);
  const totalExpense = expenseAgg[0]?.totalExpense || 0;

  const incomeAgg = await Income.aggregate([
    {
      $match: {
        userId: userObjectId,
        date: { $gte: startDate.toJSDate(), $lt: endDate.toJSDate() },
      },
    },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$amount" },
      },
    },
  ]);
  const totalIncome = incomeAgg[0]?.totalIncome || 0;

  // TODO: complete totalExpense and cashLoss
  return {
    yearMonth,
    totalExpense, // current month all expense
    totalIncome,
    // cashLoss , // {prevmonth isPostPaid = true }+ {thismonth isPostPaid = false}
    netAmount: totalIncome - totalExpense,
  };
}
