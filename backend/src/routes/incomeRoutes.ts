import { Hono } from 'hono';
import { postUserIncomes, deleteUserIncome, editUserIncome, getUserIncomes } from '../controllers/incomeController';

export const incomeRoutes = new Hono();

incomeRoutes.get('/',getUserIncomes)
incomeRoutes.post('/',postUserIncomes)
incomeRoutes.put('/:incomeId',editUserIncome)
incomeRoutes.delete('/:incomeId',deleteUserIncome)