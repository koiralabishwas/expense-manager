import { Hono } from 'hono';
import { createUser, getUserById, getUsers , updateUser , deleteUser } from '../controllers/userController';

export const userRoutes = new Hono();
userRoutes.get('/',getUsers);
userRoutes.get('/:userId' ,getUserById)
// Handle POST requests to add a new user
userRoutes.post('/', createUser);
userRoutes.put('/:userId' , updateUser)
userRoutes.delete('/:userId' , deleteUser)
