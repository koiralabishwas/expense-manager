import { Hono } from 'hono'
import { home } from './routes/home'
import { db } from './db/db'

export const app = new Hono()
console.log("app started on prot 8000")

db.then(() => {
  console.log("MONGO_DB connected ")
  app.fire()
}).catch( (e : Error) => {
  console.error("DB connection ERROR : " + e.message)
})

app.route("/" , home)
app.notFound((c) => {
  return c.text("ERROR : 404 not found " , 404)
})



export default {
  port : 8000,
  fetch : app.fetch
}
