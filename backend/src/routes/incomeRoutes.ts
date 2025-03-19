import { Hono } from 'hono';
import { postUserIncome, deleteUserIncome, editUserIncome, getUserIncomes } from '../controllers/incomeController';

export const incomeRoutes = new Hono();

incomeRoutes.get('/',getUserIncomes)
incomeRoutes.post('/',postUserIncome)
incomeRoutes.put('/:incomeId',editUserIncome)
incomeRoutes.delete('/:incomeId',deleteUserIncome)