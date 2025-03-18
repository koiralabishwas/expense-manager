import { Hono } from 'hono';

export const home = new Hono();
home.get('/', async (ctx) => {
  return ctx.json({info : "Welcome to Hono Backend"})
});

