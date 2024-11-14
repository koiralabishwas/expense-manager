import { Hono } from "hono";
import { home } from "./routes/home";
import { db } from "./configs/db";
import { userRoutes } from "./routes/userRoutes";
import { incomeRoutes } from "./routes/incomeRoutes";
import { expenseRoutes } from "./routes/expenseRoutes";
import { authRoutes } from "./routes/authRoutes";
import { authentication } from "./middlewares/authentication";

const app = new Hono();
const protectedRoutes = new Hono();

app.route("/", home);
app.route("/auth", authRoutes);

// auth required routes
// app.use("/api/*", authentication);
app.route("/api/users", userRoutes); // Set up user routes
app.route("/api/incomes", incomeRoutes);
app.route("/api/expenses", expenseRoutes);

app.notFound((c) => c.text("ERROR: 404 not found LOL", 404)); // Handle 404 errors

export { app };
