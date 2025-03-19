import { Hono } from 'hono';
import { deleteUserExpense, editUserExpense, getUserExpenses, postUserExpense } from '../controllers/expenseController';

export const expenseRoutes = new Hono();

expenseRoutes.get('/',getUserExpenses)
expenseRoutes.post('/',postUserExpense)
expenseRoutes.put('/:expenseId',editUserExpense)
expenseRoutes.delete(':expenseId',deleteUserExpense)