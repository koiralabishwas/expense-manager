// NOTE : Genre を増やす際に income.d.ts　| expense.d.ts で型もいじる必要性がある
export const expenseGenres = [
  "Water",
  "Drinks",
  "Meal",
  "Snacks",
  "Groceries",
  "DailyGoods",
  "Entertainment",
  "Devices",
  "Hangouts",
  "Study",
  "Clothing",
  "Other",
] as const;

export type ExpenseGenre = (typeof expenseGenres)[number];

export const expenseGenreLabels: Record<ExpenseGenre, string> = {
  Water: "水分補給",
  Drinks: "ドリンク",
  Meal: "食事",
  Snacks: "おやつ",
  Groceries: "食料品",
  DailyGoods: "日常品",
  Entertainment: "娯楽",
  Devices: "デバイス",
  Hangouts: "遊び",
  Study: "勉強",
  Clothing: "衣類",
  Other: "その他",
};
