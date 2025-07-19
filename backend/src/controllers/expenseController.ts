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
        zone: "utc",
      }).startOf("month");
      endDate = startDate.plus({ months: 1 });
    }

    const userExpense = await Expense.find({
      userId: _id,
      ...(yearMonth &&
        startDate &&
        endDate && {
          date: {
            $gte: startDate.toJSDate(),
            $lt: endDate.toJSDate(),
          },
        }),
    });
    return ctx.json(userExpense);
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
