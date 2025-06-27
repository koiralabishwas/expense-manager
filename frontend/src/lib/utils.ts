export function getCurrnentYearMonth() {
  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
  return currentYear + currentMonth;
}
