import { DateTime } from "luxon";
import Expense from "../models/expense";
import Income from "../models/income";

// TODO: make it memmory efficient
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
  }).sort({ date: -1 });
  
  const totalExpense = userExpense.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalIncome = userIncomes.reduce((sum , e) => sum + (e.amount || 0) , 0)
  const netAmount = totalIncome - totalExpense
  return {
    yearMonth,
    totalExpense,
    totalIncome,
    netAmount
  };
}
