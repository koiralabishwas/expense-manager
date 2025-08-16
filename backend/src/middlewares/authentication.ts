import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import User from "../models/user";

export async function authentication(ctx: Context, next: Next) {
  const token =
    getCookie(ctx, "x-auth-token") ||
    ctx.req.header("Authorization")?.replace(/^Bearer\s+/, "");

  if (!token) {
    return ctx.json({ error: "Unauthorized" }, 401);
  }
  try {
    const payload = await verify(token, process.env.JWT_SECRET!);
    ctx.set("user", payload);
    const existingUser = await User.findById(payload._id!);

    // ユーザーが存在しない、または無効な場合はエラーを返す
    if (!existingUser) {
      return ctx.json({ error: "Invalid token: User not found." }, 401);
    }
    await next();
  } catch (error) {
    return ctx.json({ error: "unexpected error :", detail: error }, 401);
  }
}
