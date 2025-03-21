import { Hono } from 'hono';
import {getLoggedUser, updateLoggedUser, deleteLoggedUser } from '../controllers/userController';

export const userRoutes = new Hono();
userRoutes.get('/',getLoggedUser);
userRoutes.put('/' , updateLoggedUser)
userRoutes.delete('/' , deleteLoggedUser)
