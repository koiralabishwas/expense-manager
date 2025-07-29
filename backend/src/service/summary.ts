import { DateTime } from "luxon";
import Expense from "../models/expense";
import Income from "../models/income";

// TODO: need to calculate
export async function getMonthlyBalanceSummary(
  userId: string,
  yearMonth: string
) {
  const startDate = DateTime.fromFormat(yearMonth, "yyyyMM", {
    zone: "Asia/Tokyo",
  }).startOf("month");
  const endDate = startDate.plus({ months: 1 });

  // Fetch user expenses (detailed)
  const userExpense = await Expense.find({
    userId: userId,
    date: {
      $gte: startDate.toJSDate(),
      $lt: endDate.toJSDate(),
    },
  }).sort({ date: -1 });

  const userIncomes = await Income.find({
    userId: userId,
    date: {
      $gte: startDate.toJSDate(),
      $lt: endDate.toJSDate(),
    },
  });

  return {
    yearMonth,
    userExpense,
    userIncomes
  };
}
