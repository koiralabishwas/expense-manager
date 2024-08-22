import { Hono } from 'hono'
import { home } from './routes/home'

export const app = new Hono()
console.log("app started on prot 8000")

app.route("/" , home)
app.notFound((c) => {
  return c.text("ERROR : 404 not found " , 404)
})


export default {
  port : 8000,
  fetch : app.fetch
}
