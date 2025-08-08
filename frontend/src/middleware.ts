import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED_PATHS = ["/dashboard", "/expenses", "/incomes" , "/"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!isProtected) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token at all, redirect
  if (!token?.accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Backend token validation
  try {
    const checkRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    if (!checkRes.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    console.error("Backend auth check failed:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
