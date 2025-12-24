"use server";

import connectDB from "@/configs/db";
import { authOptions } from "@/lib/auth";
import User from "@/models/user";
import { getServerSession } from "next-auth";

export async function getPreferences() : Promise<Preferences> {
  connectDB();
  const session = await getServerSession(authOptions);
  try {
    const user = await User.findById(session?.user._id);
    return JSON.parse(JSON.stringify(user?.preferences));
  } catch (error) {
    throw new Error("Failed to get user preferences");
  }
}

export async function getIncomeGenres() {
  connectDB();

  const session = await getServerSession(authOptions);
  const incomeGenres = await User.findById(session?.user._id).then(
    (user) => user?.preferences?.incomeGenres
  );
  return JSON.parse(JSON.stringify(incomeGenres));
}

export async function addIncomeGenre(incomeGenre: string) {
  connectDB();
  const session = await getServerSession(authOptions);
  const updatedUser = await User.findByIdAndUpdate(
    session?.user._id,
    {
      $addToSet: { "preferences.incomeGenres": incomeGenre },
    },
    { new: true, runValidators: true }
  );

  return JSON.parse(JSON.stringify(updatedUser?.preferences?.incomeGenres));
}

export async function deleteIncomeGenre(incomeGenre: string) {
  connectDB();
  const session = await getServerSession(authOptions);
  const updatedUser = await User.findByIdAndUpdate(
    session?.user._id,
    {
      $pull: {
        "preferences.incomeGenres": incomeGenre,
      },
    },
    { new: true, runValidators: true }
  );

  return JSON.parse(JSON.stringify(updatedUser?.preferences?.incomeGenres));
}

export async function getExpenseGenre() {
  connectDB();

  const session = await getServerSession(authOptions);
  const expenseGenres = await User.findById(session?.user._id).then(
    (user) => user?.preferences?.epenseGenres
  );
  return JSON.parse(JSON.stringify(expenseGenres));
}

export async function addExpenseGenre(expenseGenre: string) {
  connectDB();
  const session = await getServerSession(authOptions);
  const updatedUser = await User.findByIdAndUpdate(
    session?.user._id,
    {
      $addToSet: { "preferences.expenseGenres": expenseGenre },
    },
    { new: true, runValidators: true }
  );

  return JSON.parse(JSON.stringify(updatedUser?.preferences?.expenseGenres));
}

export async function deleteExpenseGenre(expenseGenre: string) {
  connectDB();
  const session = await getServerSession(authOptions);
  const updatedUser = await User.findByIdAndUpdate(
    session?.user._id,
    {
      $pull: {
        "preferences.expenseGenres": expenseGenre,
      },
    },
    { new: true, runValidators: true }
  );

  return JSON.parse(JSON.stringify(updatedUser?.preferences?.expenseGenres));
}

export async function getSubscription() {
  connectDB();
  const session = await getServerSession(authOptions);
  const subscription = await User.findById(session?.user._id).then(
    (user) => user?.preferences?.subscriptions
  );
  return JSON.parse(JSON.stringify(subscription));
}

// TODO: subscription 作成特に　expense にも記録する

type Subscription = {
  _id : string
  name: string;
  amount: string;
  paymentDay: number;
  isActive: boolean;
};
export async function addSubscription(subscription : Subscription) {
  connectDB();
  const session = await getServerSession(authOptions);

  const subscirptions = await User.findByIdAndUpdate(
    session?.user._id,
    {
      $addToSet: { "preferences.subscriptions": subscription },
    },
    { new: true, runValidators: true }
  ).then((user) => user?.preference?.subscriptions);
  return JSON.parse(JSON.stringify(subscirptions))
}

export async function deleteSubscription(subscriptionId : string) {
  connectDB();
  const session = await getServerSession(authOptions); 
    const updatedUser = await User.findByIdAndUpdate(
      session?.user._id,
      {
        $pull: { "preferences.subscriptions": { _id: subscriptionId } },
      },
      { new: true }
    );
    return JSON.parse(JSON.stringify(updatedUser?.preferences?.subscriptions))
}

// TODO: error handling when non existing subscription
export async function editSubscription(subscriptionId : string,subscription: Subscription) {
  await connectDB()
  const session = await getServerSession(authOptions);

  // 1. Convert the object to Mongoose "dot notation"
  const setOptions: Record<string, any> = {};

  for (const [key, value] of Object.entries(subscription)) {
    // This creates "preferences.subscriptions.$.name"
    setOptions[`preferences.subscriptions.$.${key}`] = value;
  }
  const updatedUser = await User.findOneAndUpdate(
    { _id: session?.user._id, "preferences.subscriptions._id": subscriptionId },
    {
      $set: setOptions,
    },
    { new: true, runValidators: true }
  );
  return JSON.parse(JSON.stringify(updatedUser?.preferences?.subscriptions));
}

type CreditPaymentTiming = {
  delayMonth : number,
  day : number
}

// Credit Payment Timing (which is needed to calculate cass loss)
export async function getCreditPaymentTiming() {
  await connectDB();
  const session =await getServerSession(authOptions)
    const creditPaymentTiming = await User.findById(session?.user._id).then(
      (user) => user?.preferences?.creditPaymentTiming
    );
    return JSON.parse(JSON.stringify(creditPaymentTiming));
}

export async function editCreditPaymentTiming({ delayMonth, day }: CreditPaymentTiming) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const updatedUser = await User.findByIdAndUpdate(
    session?.user._id,
    {
      $set: {
        "preferences.creditPaymentTiming.delayMonth": delayMonth,
        "preferences.creditPaymentTiming.day": day,
      },
    },
    { new: true, runValidators: true }
  );

  return JSON.parse(JSON.stringify(updatedUser?.preferences?.creditPaymentTiming));
}
