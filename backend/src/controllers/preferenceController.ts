import { Context } from "hono";
import User from "../models/user";

//TODO: validaiton

export async function getUserPreferences(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const user = await User.findById(_id);
    return ctx.json(user?.preferences);
  } catch (error) {
    return ctx.json(
      { error: "Failed to get user preferences", err: error },
      500
    );
  }
}

export async function getIncomeGenre(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const incomeGerne = await User.findById(_id).then(
      (incomeGenre) => incomeGenre?.preferences?.incomeGenres
    );
    return ctx.json(incomeGerne);
  } catch (error) {
    return ctx.json({ error: "Failed getting income genre", err: error }, 500);
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
        $addToSet: { "preferences.incomeGenres": incomeGenre },
      },
    {new : true , runValidators : true}
    );
    return ctx.json(updatedUser?.preferences?.incomeGenres);
  } catch (error) {
    return ctx.json({ error: "Failed adding genre", err: error }, 500);
  }
}

export async function deleteIncomeGenre(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const body = await ctx.req.json();
    const incomeGenre = body.incomeGenre;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $pull: { "preferences.incomeGenres": incomeGenre },
      },
    {new : true , runValidators : true}
    );
    return ctx.json(updatedUser?.preferences?.incomeGenres);
  } catch (error) {
    return ctx.json({ error: "Failed deleting genre", err: error }, 500);
  }
}


export async function getExpenseGenre(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const user = await User.findById(_id).select("preferences.expenseGenres");
    return ctx.json(user?.preferences?.expenseGenres);
  } catch (error) {
    return ctx.json({ error: "Failed getting expense genre", err: error }, 500);
  }
}

export async function addExpenseGenre(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const body = await ctx.req.json();
    const expenseGenre = body.expenseGenre; 
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        // $addToSet prevents duplicates automatically
        $addToSet: { "preferences.expenseGenres": expenseGenre },
      },
    {new : true , runValidators : true}
    );
    return ctx.json(updatedUser?.preferences?.expenseGenres);
  } catch (error) {
    return ctx.json({ error: "Failed adding genre", err: error }, 500);
  }
}

export async function deleteExpenseGenre(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const body = await ctx.req.json();
    const expenseGenre = body.expenseGenre;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        // $pull removes the item from the array
        $pull: { "preferences.expenseGenres": expenseGenre },
      },
    {new : true , runValidators : true}
    );
    return ctx.json(updatedUser?.preferences?.expenseGenres);
  } catch (error) {
    return ctx.json({ error: "Failed deleting genre", err: error }, 500);
  }
}

export async function addSubscription(ctx:Context) {
    try {
    const { _id } = ctx.get("user");
    const body = await ctx.req.json();
    const subscription = body.subscription;

    const updatedUser = await User.findByIdAndUpdate(_id, {
      $addToSet :{"preferences.subscriptions" : subscription}
    },
    {new : true , runValidators : true}
  )
  return ctx.json(updatedUser?.preferences?.subscriptions);

  } catch (error) {
    return ctx.json({error : "failed adding subscription" , err : error})
  }
}
