import { Hono } from "hono";
import { app } from "..";

export const home = new Hono()
  .get("/" , (c) => c.text("Hello to Expense Tracker App"))

