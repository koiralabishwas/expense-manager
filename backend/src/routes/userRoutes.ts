import { Hono } from 'hono';
import { createUser, getUserById, getUsers , updateUser , deleteUser } from '../controllers/userController';

export const users = new Hono();

users.get('/',getUsers);
users.get('/:userId' ,getUserById)
// Handle POST requests to add a new user
users.post('/', createUser);
users.put('/:userId' , updateUser)
users.delete('/:userId' , deleteUser)
