import { Hono } from 'hono';
import { addUserIncome, deleteUserIncome, editUserIncome, getAllIncomes, getUserIncomes } from '../controllers/incomeController';

export const incomeRoutes = new Hono();

// Get all Incomes of all Users
incomeRoutes.get('/',getAllIncomes)
// Get Incomes of a User by userId
incomeRoutes.get('/user/:userId',getUserIncomes)
// Add Income to a user by userId
incomeRoutes.post('/user/:userId' , addUserIncome)

incomeRoutes.put('/user/:userId/income/:incomeId',editUserIncome)
incomeRoutes.delete('/user/:userId/income/:incomeId',deleteUserIncome)