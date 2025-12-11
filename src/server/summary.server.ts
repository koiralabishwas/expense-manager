'use server'
import connectDB from "@/configs/db";
import { authOptions } from "@/lib/auth";
import { getMonthlyBalanceSummary } from "@/service/summaryService";
import { getServerSession } from "next-auth";

export async function getMonthSummary(yearMonth : string) {
  connectDB();
  const session = await getServerSession(authOptions);
  const balanceSummary = await getMonthlyBalanceSummary(session?.user._id!, yearMonth);
  return JSON.parse(JSON.stringify(balanceSummary))
}
