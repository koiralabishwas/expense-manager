import { Context , Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

export async function authentication(ctx:Context,next : Next) {
  const token = getCookie(ctx , 'x-auth-token') || ctx.req.header('Authorization')?.replace('Bearer' , '')
  
  if (!token) {
    return ctx.json({error : 'Unauthorized' },401)
  }
  try{
    const payload = await verify(token , process.env.JWT_SECRET!)
    ctx.set('user' , payload)
    await next()
  } catch (error) {
    return ctx.json({error : 'Invalid Token ?' , detail : error} , 401)
  }
}