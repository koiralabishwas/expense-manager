import { Hono } from 'hono';
import { home } from './routes/home';
import { db } from './configs/db';
import { users } from './routes/userRoutes';
import { incomes } from './routes/incomeRoutes';
import { expenses } from './routes/expenseRoutes'
import { auth } from './routes/authRoutes';
import { authentication } from './controllers/authController';

const app = new Hono();

function startServer() {
  app.route("/", home);  // Set up home routes

  // auth required routes
  app.use("/api/*" , authentication)
  app.route("/api/users", users);  // Set up user routes
  app.route("/api/incomes",incomes)
  app.route("/api/expenses" , expenses)

  app.route("/auth" , auth)
  app.notFound((c) => c.text("ERROR: 404 not found LOL", 404));  // Handle 404 errors
  
  try {
    app.fire();  // Start the server
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

db.then(() => {
  console.log("MongoDB connected");
  startServer();
}).catch((error: Error) => {
  console.error("DB connection error:", error.message);
});

export default {
  port: process.env.SERVER_PORT || 3000,  // Use a default port if not specified
  fetch: app.fetch,
};
