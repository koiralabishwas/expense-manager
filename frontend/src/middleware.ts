import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authOptions } from './lib/auth';
import { getToken } from 'next-auth/jwt';

const PROTECTED_PATHS = ["/dashboard", "/expenses", "/incomes"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!isProtected) {
    return NextResponse.next(); // Allow non-protected paths
  }

  const token = await getToken({ req : req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
