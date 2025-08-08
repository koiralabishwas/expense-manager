import { Context } from "hono";
import Income from "../models/income";
import { DateTime } from "luxon";

export async function getUserIncomes(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const yearMonth = ctx.req.query("yearMonth") ?? null;

    let startDate: DateTime | null = null;
    let endDate: DateTime | null = null;

    if (yearMonth) {
      startDate = DateTime.fromFormat(yearMonth, "yyyyMM", { zone: "Asia/Tokyo" }).startOf("month");
      endDate = startDate.plus({ months: 1 }); // fixed to "months" for consistency
    }

    const dateFilter =
      startDate && endDate
        ? { date: { $gte: startDate.toJSDate(), $lt: endDate.toJSDate() } }
        : {};

    const incomes = await Income.find({
      userId: _id,
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

    return ctx.json({
      yearMonth,
      incomes,
      summary,
    });
  } catch (error) {
    return ctx.json({ error: String(error) }, 400);
  }
}


export async function postUserIncome(ctx: Context) {
  try {
    const user = ctx.get("user");
    const body = await ctx.req.json();
    const newUserIncome = await new Income({
      userId: user._id,
      date: body.date,
      description: body.description,
      amount: body.amount,
      genre: body.genre,
    }).save();
    return ctx.json(newUserIncome);
  } catch (error) {
    return ctx.json({ error }, 400);
  }
}

export async function editUserIncome(ctx: Context) {
  try {
    const user = ctx.get("user");
    const incomeId = ctx.req.param("incomeId");
    const body = await ctx.req.json();
    const changedUserIncome = await Income.findOneAndUpdate(
      { _id: incomeId, userId: user._id },
      body,
      { new: true, runValidators: true }
    );
    return ctx.json(changedUserIncome);
  } catch (error) {
    return ctx.json({ error }, 400);
  }
}

export async function deleteUserIncome(ctx: Context) {
  try {
    const user = ctx.get("user");
    const incomeId = ctx.req.param("incomeId");
    const deletedUserIncome = await Income.findOneAndDelete({
      _id: incomeId,
      userId: user._id,
    });
    return ctx.json(deletedUserIncome);
  } catch (error) {
    return ctx.json({ error }, 400);
  }
}
