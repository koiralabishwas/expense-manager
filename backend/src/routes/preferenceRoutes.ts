import { Hono } from "hono";
import { addIncomeGenre, getUserPreferences, removeIncomeGenre } from "../controllers/userSettingController";

export const preferenceRoutes = new Hono();

preferenceRoutes.get('/' , getUserPreferences)
preferenceRoutes.post('/incomeGenre' , addIncomeGenre)
preferenceRoutes.delete('/incomeGenre' , removeIncomeGenre)
preferenceRoutes.post("/")
preferenceRoutes.put("/")
preferenceRoutes.delete("")

