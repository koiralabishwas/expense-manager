// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    token?: string;
  }

  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
    };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      _id: string;
      name: string;
      email: string;
    };
    accessToken?: string;
  }
}
