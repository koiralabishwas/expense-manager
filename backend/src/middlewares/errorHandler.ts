import { Context , Next } from "hono";

export async function errorHandler(ctx:Context , next : Next) {
  try {
    await next()
  } catch (error) {
    console.log(error)
    ctx.status(500)
    ctx.json({error})
  }
}

