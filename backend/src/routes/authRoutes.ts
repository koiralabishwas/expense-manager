import { Hono } from 'hono'
import {logger} from 'hono/logger'
import { login, register } from '../controllers/authController';

export const authRoutes = new Hono();

// auth.use('/*',authentication)
authRoutes.post("/login",login)
authRoutes.post("/register" , register)


