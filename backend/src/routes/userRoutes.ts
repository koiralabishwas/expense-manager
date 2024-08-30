import { Hono } from 'hono';
import { createUser, getUserById, getUsers , updateUser , deleteUser } from '../controllers/userController';

export const users = new Hono();

users.get('/',getUsers);
users.get('/:id' ,getUserById)
// Handle POST requests to add a new user
users.post('/', createUser);
users.put('/:id' , updateUser)
users.delete('/:id' , deleteUser)
