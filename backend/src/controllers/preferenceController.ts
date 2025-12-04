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
      { new: true, runValidators: true }
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
      { new: true, runValidators: true }
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
      { new: true, runValidators: true }
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
      { new: true, runValidators: true }
    );
    return ctx.json(updatedUser?.preferences?.expenseGenres);
  } catch (error) {
    return ctx.json({ error: "Failed deleting genre", err: error }, 500);
  }
}
export async function getSubscription(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const subscription = await User.findById(_id).then(
      (user) => user?.preferences?.subscriptions
    );
    return ctx.json(subscription);
  } catch (error) {
    return ctx.json({ error: "failed getting subscription", err: error });
  }
}

// TODO: subscription 作成特に　expense にも記録する
export async function addSubscription(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const body = await ctx.req.json();
    const subscription = body.subscription;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $addToSet: { "preferences.subscriptions": subscription },
      },
      { new: true, runValidators: true }
    );
    return ctx.json(updatedUser?.preferences?.subscriptions);
  } catch (error) {
    return ctx.json({ error: "failed adding subscription", err: error });
  }
}

export async function deleteSubscription(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const subsId = ctx.req.param("subscriptionId");
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $pull: { "preferences.subscriptions": { _id: subsId } },
      },
      { new: true }
    );
    return ctx.json(updatedUser?.preferences?.subscriptions);
  } catch (error) {
    return ctx.json({ error: "failed deleting subscription", err: error });
  }
}

// TODO: error handling when non existing subscription
export async function editSubscription(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const subsId = ctx.req.param("subscriptionId");
    const body = await ctx.req.json();
    const updatedSubscription = body?.subscription;

    if (!updatedSubscription) {
      return ctx.json({ error: "no subscription provided" }, 400);
    }

    // 1. Convert the object to Mongoose "dot notation"
    const setOptions: Record<string, any> = {};

    for (const [key, value] of Object.entries(updatedSubscription)) {
      // This creates "preferences.subscriptions.$.name"
      setOptions[`preferences.subscriptions.$.${key}`] = value;
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: _id, "preferences.subscriptions._id": subsId },
      {
        $set: setOptions,
      },
      { new: true, runValidators: true }
    );
    return ctx.json(updatedUser?.preferences?.subscriptions);
  } catch (error) {
    return ctx.json({ error: "failed editing subscription", err: error });
  }
}

// Credit Payment Timing (which is needed to calculate cass loss)
export async function getCreditPaymentTiming(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const creditPaymentTiming = await User.findById(_id).then(
      (user) => user?.preferences?.creditPaymentTiming
    );
    return ctx.json(creditPaymentTiming);
  } catch (error) {
    return ctx.json({
      error: "failed getting creditPaymentTiming",
      err: error,
    });
  }
}

export async function editCreditPaymentTiming(ctx: Context) {
  try {
    const { _id } = ctx.get("user");
    const { delayMonth, day } = await ctx.req.json();
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          "preferences.creditPaymentTiming.delayMonth": delayMonth,
          "preferences.creditPaymentTiming.day": day,
        },
      },
      { new: true, runValidators: true }
    );

    return ctx.json(updatedUser?.preferences?.creditPaymentTiming);
  } catch (error) {
    return ctx.json({
      error: "failed getting creditPaymentTiming",
      err: error,
      req: await ctx.req.json(),
    });
  }
}
