import { Hono } from 'hono';
import mongoose from 'mongoose';
export const home = new Hono();

home.get('/', async (ctx) => {
  return ctx.html(
    `<!doctype html>
      <h1>Hello! to HONO BACKEND</h1>`
  )
});

