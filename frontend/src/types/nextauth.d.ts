import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  // 1. The User object returned from your 'authorize' function
  interface User {
    _id: string;
    // We removed 'token' because it's no longer needed
  }

  // 2. The Session object available in client (useSession) & server (getServerSession)
  interface Session {
    user: {
      _id: string;
      name?: string | null;
      email?: string | null;
    };
    // We removed 'accessToken' because the session cookie handles security now
  }
}

declare module "next-auth/jwt" {
  // 3. The JSON Web Token stored in the encrypted cookie
  interface JWT {
    _id: string;
    // We flatten this (no nested 'user' object) for simpler access
  }
}
