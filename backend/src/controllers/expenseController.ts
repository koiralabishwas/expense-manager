import { Context } from "hono";
import Expense from "../models/expense";
import { DateTime } from "luxon";
import { Types } from "mongoose";

export async function getUserExpenses(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const userObjectId = new Types.ObjectId(_id);
    const yearMonth = ctx.req.query("yearMonth") ?? null;

    let startDate: DateTime | null = null;
    let endDate: DateTime | null = null;

    if (yearMonth) {
      startDate = DateTime.fromFormat(yearMonth, "yyyyMM", { zone: "Asia/Tokyo" }).startOf("month");
      endDate = startDate.plus({ months: 1 });
    }

    const dateFilter = startDate && endDate
      ? { date: { $gte: startDate.toJSDate(), $lt: endDate.toJSDate() } }
      : {};

    const expenses = await Expense.find({
      userId: _id,
      ...dateFilter,
    }).sort({ date: -1 });

    // Single pass calculation
    const summary = {
      total: 0,
      cashPaid: 0,
      postPaid: 0,
      genres: {} as Record<string, number>,
    };

    for (const ex of expenses) {
      const amount = ex.amount || 0;
      summary.total += amount;
      if (ex.isPostPaid) summary.postPaid += amount;
      else summary.cashPaid += amount;
      summary.genres[ex.genre] = (summary.genres[ex.genre] || 0) + amount;
    }

    // Aggregation for prevMonthPostPaid
    const prevMonthPostPaid = startDate && endDate
      ? (await Expense.aggregate([
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
        ]))[0]?.total || 0
      : 0;

    const cashLoss = summary.cashPaid + prevMonthPostPaid;

    return ctx.json({
      yearMonth,
      expenses,
      summary: {
        ...summary,
        prevMonthPostPaid,
        cashLoss,
      },
    });
  } catch (error) {
    return ctx.json({ error: String(error) }, 400);
  }
}


export async function postUserExpense(ctx: Context) {
  try {
    const user = ctx.get("user");
    const body = await ctx.req.json();
    const newUserExpense = await new Expense({
      userId: user._id,
      date: body.date,
      description: body.description,
      amount: body.amount,
      genre: body.genre,
      isPostPaid: body.isPostPaid,
    }).save();
    return ctx.json(newUserExpense);
  } catch (error) {
    return ctx.json({ error }, 400);
  }
}

export async function editUserExpense(ctx: Context) {
  try {
    const expenseId = ctx.req.param("expenseId");
    const user = await ctx.get("user");
    const body = await ctx.req.json();
    const changedUserExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, userId: user._id },
      body,
      { new: true, runValidators: true }
    );
    return ctx.json(changedUserExpense);
  } catch (error) {
    return ctx.json({ error }, 400);
  }
}

export async function deleteUserExpense(ctx: Context) {
  try {
    const user = ctx.get("user");
    const expenseId = ctx.req.param("expenseId");
    const deletedUserExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      userId: user._id,
    });
    return ctx.json(deletedUserExpense);
  } catch (error) {
    return ctx.json({ error }, 400);
  }
}
