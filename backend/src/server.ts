import { db } from './configs/db'
import {app} from './index'


db.then(() => {
  console.log("Mongo db Connected");
  app.fire();
  console.log(`server running on port ${process.env.SERVER_PORT || 3000}`)
}).catch((error : Error) => {
  console.error('Server Error ' , error.message)
})

export default {
  port : process.env.SERVER_PORT,
  fetch : app.fetch
}