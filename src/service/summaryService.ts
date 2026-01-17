import { DateTime } from "luxon";
import { Types } from "mongoose";
import Expense from "../models/expense";
import Income from "../models/income";
import { getCreditPaymentTiming } from "@/server/preference.server";

export async function getMonthlyBalanceSummary(
  userId: string,
  yearMonth: string
) {
  // --- Normalize all dates to UTC boundaries ---
  const startDate = DateTime.fromFormat(yearMonth, "yyyyMM", {
    zone: "Asia/Tokyo",
  })
    .startOf("month")
    .toUTC();

  const endDate = startDate.plus({ months: 1 });

  const creditPaymentTiming = await getCreditPaymentTiming()
  const prevStartDate = startDate.minus({ months: creditPaymentTiming.delayMonth });
  const prevEndDate = endDate.minus({ months: creditPaymentTiming.delayMonth });

  const userObjectId = new Types.ObjectId(userId);

  // --- Aggregate expenses in one query ---
  const expenseAgg = await Expense.aggregate([
    { $match: { userId: userObjectId } },
    {
      $facet: {
        totalExpense: [
          {
            $match: {
              date: { $gte: startDate.toJSDate(), $lt: endDate.toJSDate() },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
        prevMonthPostPaid: [
          {
            $match: {
              isPostPaid: true,
              date: {
                $gte: prevStartDate.toJSDate(),
                $lt: prevEndDate.toJSDate(),
              },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
        currentMonthPaid: [
          {
            $match: {
              isPostPaid: false,
              date: { $gte: startDate.toJSDate(), $lt: endDate.toJSDate() },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
        currentMonthPostPaid: [
          {
            $match: {
              isPostPaid: true,
              date: { $gte: startDate.toJSDate(), $lt: endDate.toJSDate() },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
      },
    },
  ]);

  const expenseData = expenseAgg[0] || {};
  const totalExpense = expenseData.totalExpense?.[0]?.total || 0;
  const prevMonthPostPaid = expenseData.prevMonthPostPaid?.[0]?.total || 0;
  const currentMonthPaid = expenseData.currentMonthPaid?.[0]?.total || 0;
  const currentMonthPostPaid = expenseData.currentMonthPostPaid?.[0]?.total || 0;

  const totalCashLoss = prevMonthPostPaid + currentMonthPaid;

  // --- Aggregate income in one query ---
  const incomeAgg = await Income.aggregate([
    {
      $match: {
        userId: userObjectId,
        date: { $gte: startDate.toJSDate(), $lt: endDate.toJSDate() },
      },
    },
    { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
  ]);
  const totalIncome = incomeAgg[0]?.totalIncome || 0;

  return {
    yearMonth,
    prevMonthPostPaid,
    currentMonthPaid,
    currentMonthPostPaid,
    totalIncome,
    totalExpense, // current month all expense
    totalCashLoss, // prevMonth postpaid + currentMonth paid
    netAmount: totalIncome - totalExpense,
  };
}
