import { Context } from "hono";

import User from "../models/user";
import { getMonthlyBalanceSummary } from "../service/summaryService";

export async function getBalanceSummary(ctx: Context) {
  try {
    const { _id: userId } = await ctx.get("user");
    const yearMonth = ctx.req.query("yearMonth");
    if (!yearMonth) {
      return ctx.json({ error: "yearMonth is required" }, 400);
    }
    const balanceSummary = await getMonthlyBalanceSummary(userId, yearMonth);
    return ctx.json(balanceSummary, 200);
  } catch (error) {}
}
