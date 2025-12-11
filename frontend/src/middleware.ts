import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED_PATHS = ["/dashboard", "/expenses", "/incomes", "/"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Check if the current path is in the protected list
  // Note: logic handles subpaths (e.g. /dashboard/settings) correctly
  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // If not protected, let them pass immediately
  if (!isProtected) return NextResponse.next();

  // 2. Check for the token
  // We use getToken because getServerSession does not work in Edge Middleware
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 3. If not logged in, redirect to login
  if (!token) {
    const url = new URL("/login", req.url);
    // Optional: Add a callback to return here after login
    url.searchParams.set("callbackUrl", pathname); 
    return NextResponse.redirect(url);
  }

  // 4. Logged in? Continue.
  return NextResponse.next();
}

// Optimization: Exclude static files and API routes from this middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
