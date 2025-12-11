import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/configs/db"; // Ensure this path is correct
import User from "@/models/user";     // Ensure this path is correct

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Connect to DB
        await connectDB();

        // 2. Check if input is valid
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // 3. Find user in the database
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        // 4. Verify Password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }

        // 5. Return User Object
        // FIX: We return both 'id' (for NextAuth defaults) and '_id' (for your custom type)
        return {
          id: user._id.toString(),
          _id: user._id.toString(), // <--- The Fix: Satisfies your custom 'User' type
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // 'user' is only available on the first call (login)
      if (user) {
        // We map the _id from the user object we returned above
        token._id = user._id; 
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass data from token to the client-side session
      if (token && session.user) {
        // We map the _id from the token to the session
        session.user._id = token._id as string; 
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
