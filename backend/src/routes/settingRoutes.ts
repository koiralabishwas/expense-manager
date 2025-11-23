import { Hono } from "hono";
import { getUserSettings } from "../controllers/userSettingController";

export const settingRoutes = new Hono();

settingRoutes.get('/' , getUserSettings)
settingRoutes.post("/")
settingRoutes.put("/")
settingRoutes.delete("")

