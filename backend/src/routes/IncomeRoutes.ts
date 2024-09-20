import { Hono } from 'hono';
import { addUserIncome, editUserIncome, getAllIncomes, getUserIncomes } from '../controllers/incomeController';

export const incomes = new Hono();

incomes.get('/',getAllIncomes)

incomes.get('/user/:userId',getUserIncomes)
incomes.post('/user/:userId' , addUserIncome)

incomes.put('/user/:userId/income/:incomeId',editUserIncome)