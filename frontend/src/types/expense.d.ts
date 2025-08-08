interface Expense extends Transaction {
  _id: string;
  userId: string;
  date: string;
  description: string;
  amount: number;
  // currency: string; // not needed now
  genre: string;
  createdAt: string;
  updatedAt: string;
  isPostPaid: boolean;
  __v: number;
}

 type ExpenseSummary = {
  total: number;
  cashPaid: number;
  postPaid: number;
  genre: Record<string, number>;
};

 type ExpenseRes = {
  yearMonth: string;
  expenses: Expense[];
  summary: ExpenseSummary;
};
