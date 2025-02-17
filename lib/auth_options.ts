import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import UserAuth from "@/models/UserAuth.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectToDatabase();
          const user = await UserAuth.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Incorrect Credentials");
          }

          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.first_name = (user as any).first_name; // Explicitly cast
        token.last_name = (user as any).last_name;
      }
      return token;
    },
  
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        first_name: token.first_name as string,
        last_name: token.last_name as string,
      };
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  session: {
    strategy: "jwt",
    maxAge:  24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
