import { Hono } from 'hono';
import { postUserIncomes, deleteUserIncome, editUserIncome, getUserIncomes } from '../controllers/incomeController';

export const incomeRoutes = new Hono();

/**TODO:
 * GET '/' get all income
 * POST '/' register an income
 * put '/:incomeID
 * delete '/:incomeID
 */

// Get all Incomes of all Users
// Get Incomes of a User by userId
incomeRoutes.get('/',getUserIncomes)
// Add Income to a user by userId
incomeRoutes.post('/',postUserIncomes)
incomeRoutes.put('/:incomeId',editUserIncome)
incomeRoutes.delete('/:incomeId',deleteUserIncome)