import { userSchema } from "@/models/user";

type UserT = {
  name: string;
  email: string;
  preferences: Preferences;
};

type Preferences = {
  expenseGenres: string[];
  incomeGenres: string[];
  creditPaymentTiming: CreditPaymentTiming;
  subscriptions: Subscription[];
};

type CreditPaymentTiming = {
  delayMonth: number;
  day: number;
};

type Subscription = {
  _id?: string;
  name: string;
  amount: number;
  paymentDay: number;
  isActive: boolean;
  isPostPaid: boolean;
};
