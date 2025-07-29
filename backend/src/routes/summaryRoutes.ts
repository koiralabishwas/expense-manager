import { Hono } from "hono";
import { getBalanceSummary } from "../controllers/summaryControllers";

export const summaryRoutes = new Hono();

summaryRoutes.get("balance" , getBalanceSummary)
