import { serve } from 'bun'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.notFound((c) => {
  return c.text("ERROR : 404 not found " , 404)
})


export default {
  port : 8000,
  fetch : app.fetch
}
