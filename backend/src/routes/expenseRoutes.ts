import { Hono } from 'hono';
import { deleteUserExpense, editUserExpense, getUserExpenses, postUserExpenses } from '../controllers/expenseController';

export const expenseRoutes = new Hono();

expenseRoutes.get('/',getUserExpenses)
expenseRoutes.post('/',postUserExpenses)
expenseRoutes.put('/:expenseId',editUserExpense)
expenseRoutes.delete(':expenseId',deleteUserExpense)