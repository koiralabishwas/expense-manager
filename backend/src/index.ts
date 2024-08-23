import { Hono } from 'hono';
import { home } from './routes/home';
import { db } from './db/db';
import { users } from './routes/users';

const app = new Hono();

function startServer() {
  app.route("/", home);  // Set up routes
  app.route("/users",users)
  app.notFound((c) => c.text("ERROR: 404 not found", 404));  // Handle 404 errors
  app.fire();  // Start the server
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
};

db.then(() => {
  console.log("MongoDB connected");
  startServer();
}).catch((error: Error) => {
  console.error("DB connection error:", error.message);
});

export default {
  port: process.env.SERVER_PORT,
  fetch: app.fetch,
};
