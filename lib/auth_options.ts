import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import UserAuth from "@/models/UserAuth.model";
import GoogleProvider from "next-auth/providers/google";
import UserDetail from "@/models/UserDetail.model";
import { redirect } from "next/navigation";



export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
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
        token.email = (user as any).email;
        token.first_name = (user as any).first_name; // Explicitly cast
        token.last_name = (user as any).last_name;
      }
      return token;
    },
  
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        first_name: token.first_name as string,
        last_name: token.last_name as string,
      };
      return session;
    },

    async signIn({account, user}) {
      if (account?.provider === "google") {
      console.log(user)
      try {
        await connectToDatabase()
        const userExist = await UserDetail.findOne({email : user?.email})
        if(!userExist){
         await UserDetail.create({
            user_id: "google",
            email: user?.email,
            first_name: user?.name?.split(" ")[0],
            last_name: user?.name?.split(" ")[1]
          })
          
          return true;
        }
      } catch (error) {
        console.log(error)
        return false
      }
      }
      return true
    }
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
