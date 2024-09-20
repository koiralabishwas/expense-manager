import { Hono } from 'hono';
import { addUserExpense, deleteUserExpense, editUserExpense, getAllExpenses, getUserExpenses } from '../controllers/expenseController';

export const expenses = new Hono();
// Get all Expenses of all Users
expenses.get('/',getAllExpenses)
// Get Expenses of a User by userId
expenses.get('/user/:userId',getUserExpenses)
// Add Expenses to a user by userId
expenses.post('/user/:userId' , addUserExpense)

expenses.put('/user/:userId/expense/:expenseId',editUserExpense)
expenses.delete('/user/:userId/expense/:expenseId',deleteUserExpense)