type Transaction = {
  _id: string;
  userId: string;
  date: string;
  description: string;
  amount: number;
  // currency: string; // not needed now
  genre: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface Income extends Transaction {}
interface Expense extends Transaction{}
