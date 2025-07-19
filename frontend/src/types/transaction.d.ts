type Transaction = {
  _id: string;
  userId: string;
  yearMonth: string;
  description: string;
  amount: number;
  // currency: string; // not needed now
  genre: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Income = Transaction;
type Expense = Transaction;
