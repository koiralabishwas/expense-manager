import { Hono } from 'hono';
import { addUserExpense, deleteUserExpense, editUserExpense, getAllExpenses, getUserExpenses } from '../controllers/expenseController';

export const expenseRoutes = new Hono();

// Get all Expenses of all Users
expenseRoutes.get('/',getAllExpenses)
// Get Expenses of a User by userId
expenseRoutes.get('/user/:userId',getUserExpenses)
// Add Expenses to a user by userId
expenseRoutes.post('/user/:userId' , addUserExpense)

expenseRoutes.put('/user/:userId/expense/:expenseId',editUserExpense)
expenseRoutes.delete('/user/:userId/expense/:expenseId',deleteUserExpense)