import { Hono } from 'hono'
import {logger} from 'hono/logger'
import { basicAuth } from 'hono/basic-auth'
import { authentication, login } from '../controllers/authController';


export const auth = new Hono();

// auth.use('/*',authentication)
auth.use(logger())
auth.post("/login",login)


