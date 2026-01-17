
type Income = {
  _id: string;
  userId: string;
  date: string;
  description?: string;
  amount: number;
  // currency: string; // not needed now
  genre: IncomeGenre;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// NOTE : edit for opitional Genre

type IncomeGenre = string

type IncomeSummary = {
  total: number;
  genre: Record<string, number>;
};

type IncomeRes = {
  yearMonth: string;
  incomes: Income[];
  summary: IncomeSummary;
};
