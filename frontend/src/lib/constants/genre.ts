// NOTE : Genre を増やす際に income.d.ts で型もいじる必要性がある
export const incomeGenres = ["Salary", "Gratituty", "Allowence", "Bonus", "Other"] as const;
export type IncomeGenre = typeof incomeGenres[number];
export const incomeGenreLabels: Record<IncomeGenre, string> = {
  Salary: "給与",
  Gratituty: "謝礼",
  Allowence: "お小遣い",
  Bonus: "ボーナス",
  Other: "その他",
};
