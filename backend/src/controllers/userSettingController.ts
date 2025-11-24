import { Context } from "hono";
import User from "../models/user";

//TODO: validaiton

export async function getUserSettings(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const user = await User.findById(_id);
    return ctx.json(user?.settings);
  } catch (error) {
    return ctx.json({ error: "Failed to get user settings", err: error }, 500);
  }
}

export async function addIncomeGenre(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const body = await ctx.req.json();
    const incomeGenre = body.incomeGenre;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $addToSet: { "settings.incomeGenres": incomeGenre },
      },
      { new: true }
    );
    return ctx.json(updatedUser?.settings?.incomeGenres);
  } catch (error) {
    return ctx.json({ error: "Failed adding genre", err: error }, 500);
  }
}

export async function removeIncomeGenre(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const body = await ctx.req.json();
    const incomeGenre = body.incomeGenre;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $pull: { "settings.incomeGenres": incomeGenre },
      },
      { new: true }
    );
    return ctx.json(updatedUser?.settings?.incomeGenres);

  } catch (error) {
    return ctx.json({ error: "Failed deleting genre", err: error }, 500);
  }
}
