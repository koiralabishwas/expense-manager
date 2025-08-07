import { Context } from "hono";
import Expense from "../models/expense";
import { DateTime } from "luxon";

export async function getUserExpenses(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const yearMonth = ctx.req.query("yearMonth") ?? null;
    let startDate: DateTime | undefined;
    let endDate: DateTime | undefined;

    if (yearMonth) {
      startDate = DateTime.fromFormat(yearMonth, "yyyyMM", {
        zone: "Asia/Tokyo",
      }).startOf("month");
      endDate = startDate.plus({ months: 1 });
    }
    const expenses = await Expense.find({
      userId: _id,
      ...(yearMonth &&
        startDate &&
        endDate && {
          date: {
            $gte: startDate.toJSDate(),
            $lt: endDate.toJSDate(),
          },
        }),
    }).sort({ date: -1 });

    const total = expenses.reduce(
      (totalExpense, expense) => totalExpense + (expense.amount || 0),
      0
    );
    const cashPaid = expenses
      .filter((ex) => ex.isPostPaid === false)
      .reduce((sum, ex) => sum + (ex.amount || 0), 0);
    const postPaid = expenses
      .filter((ex) => ex.isPostPaid === true)
      .reduce((sum, ex) => sum + (ex.amount || 0), 0);

    const genreSummary = expenses.reduce((acc, expense) => {
      const genre = expense.genre;
      const amount = expense.amount || 0;
      acc[genre] = (acc[genre] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);

    return ctx.json({
      yearMonth,
      expenses,
      summary: {
        total: total,
        cashPaid,
        postPaid,
        genres: genreSummary,
      },
    });
  } catch (error) {
    return ctx.json({ error }, 400);
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
