import { randomInt } from "crypto";

export function getCurrentYearMonth() {
  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
  return currentYear + currentMonth;
}

export function createOTP() {
  return randomInt(0, 1000000).toString().padStart(6, "0");
}
