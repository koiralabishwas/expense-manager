type Income = {
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

type IncomeSummary = {
  total : number,
  genre : Record<string,number>
}

type IncomeRes = {
  yearMonth : string,
  incomes : Income[],
  summary : IncomeSummary
}
