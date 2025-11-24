import { Hono } from "hono";
import { addIncomeGenre, getUserSettings, removeIncomeGenre } from "../controllers/userSettingController";

export const settingRoutes = new Hono();

settingRoutes.get('/' , getUserSettings)
settingRoutes.post('/incomeGenre' , addIncomeGenre)
settingRoutes.delete('/incomeGenre' , removeIncomeGenre)
settingRoutes.post("/")
settingRoutes.put("/")
settingRoutes.delete("")

