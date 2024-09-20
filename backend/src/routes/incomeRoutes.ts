import { Hono } from 'hono';
import { addUserIncome, deleteUserIncome, editUserIncome, getAllIncomes, getUserIncomes } from '../controllers/incomeController';

export const incomes = new Hono();
// Get all Incomes of all Users
incomes.get('/',getAllIncomes)
// Get Incomes of a User by userId
incomes.get('/user/:userId',getUserIncomes)
// Add Income to a user by userId
incomes.post('/user/:userId' , addUserIncome)

incomes.put('/user/:userId/income/:incomeId',editUserIncome)
incomes.delete('/user/:userId/income/:incomeId',deleteUserIncome)