type Expense = {
  _id: string;
  userId: string;
  date: string;
  description: string;
  amount: number;
  // currency: string; // not needed now
  genre: ExpenseGenre;
  createdAt: string;
  updatedAt: string;
  isPostPaid: boolean;
  __v: number;
};

type ExpenseGenre =
  | "Water"
  | "Drinks"
  | "Meal"
  | "Snacks"
  | "Groceries"
  | "Entertainment"
  | "Devices"
  | "Hangouts"
  | "Study"
  | "Clothing"
  | "Other";

type ExpenseSummary = {
  total: number;
  cashPaid: number;
  postPaid: number;
  prevMonthPostPaid:number,
  cashLoss : number
  genre: Record<string, number>;
};

type ExpenseRes = {
  yearMonth: string;
  expenses: Expense[];
  summary: ExpenseSummary;
};
