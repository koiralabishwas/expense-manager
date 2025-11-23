import { Hono } from "hono";
import { cors } from 'hono/cors'
import { home } from "./routes/homeRoutes";
import { db } from "./configs/db";
import { userRoutes } from "./routes/userRoutes";
import { incomeRoutes } from "./routes/incomeRoutes";
import { expenseRoutes } from "./routes/expenseRoutes";
import { authRoutes } from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { authentication } from "./middlewares/authentication";
import { summaryRoutes } from "./routes/summaryRoutes";
import { settingRoutes } from "./routes/settingRoutes";

const app = new Hono();
const protectedRoutes = new Hono();
app.use('/*',cors({
  origin: "http://localhost:3000",
  credentials: true, // needed for cookies/session handling
}))
app.use("/*" ,errorHandler)
app.route("/", home);

// authentificating routes
app.route("/auth", authRoutes);
app.get('/auth/check', authentication , (ctx) => ctx.text('authorized', 200) )

// auth required routes
app.use("/api/*",authentication);
app.route("/api/users", userRoutes); // Set up user routes
app.route("/api/users/settings" , settingRoutes)
app.route("/api/incomes", incomeRoutes);
app.route("/api/expenses", expenseRoutes);
app.route("/api/summary", summaryRoutes);

app.notFound((c) => c.text("ERROR: 404 not found LOL", 404)); // Handle 404 errors
// app.routes.forEach(route => {
//   console.log(`${route.method} ${route.path}`)
// })

export { app };
