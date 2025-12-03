import { Hono } from "hono";
import { addIncomeGenre, getUserPreferences, deleteIncomeGenre, getIncomeGenre, getExpenseGenre, addExpenseGenre, deleteExpenseGenre, addSubscription, getSubscription, editSubscription, deleteSubscription } from "../controllers/preferenceController";

export const preferenceRoutes = new Hono();

preferenceRoutes.get('/' , getUserPreferences)

preferenceRoutes.get('/incomeGenre' , getIncomeGenre)
preferenceRoutes.post('/incomeGenre' , addIncomeGenre)
preferenceRoutes.delete('/incomeGenre' , deleteIncomeGenre)

preferenceRoutes.get('/expenseGenre' , getExpenseGenre)
preferenceRoutes.post('/expenseGenre' , addExpenseGenre)
preferenceRoutes.delete('/expenseGenre' , deleteExpenseGenre)

preferenceRoutes.get('/subscription' , getSubscription)
preferenceRoutes.post('/subscription' , addSubscription)
preferenceRoutes.put('/subscription/:subscriptionId' , editSubscription)
preferenceRoutes.delete('/subscription/:subscriptionId' , deleteSubscription)


preferenceRoutes.post("/")
preferenceRoutes.put("/")
preferenceRoutes.delete("")

