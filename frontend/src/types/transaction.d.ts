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
// use interface if you want to extend it with additional types 
type Income = Transaction;
interface Expense extends Transaction {
  isPostPaid : boolean
}
