import { createCookie, getJWTSecretKey } from "@/lib/auth";
import User from "@/model/user";
import { connectToDB } from "@/utils/database";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import NextAuth from "next-auth";
import GoolgeProvider from "next-auth/providers/google";
import { parse } from "cookie";

const handler = NextAuth({
  providers: [
    GoolgeProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }: { session: any }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        //Check if a user already exists
        const isUserExists = await User.findOne({
          email: profile?.email,
        });
        //if not, create a new user
        if (!isUserExists) {
          await User.create({
            email: user?.email,
            username: user?.name?.replace(" ", "").toLowerCase(),
            name: user?.name,
          });
        }
        return true;
      } catch (error: any) {
        console.error("Error checking if user exists: ", error.message);
        return false;
      }
    },
    async jwt({ token }) {
      const serializedCookie: string = await createCookie();

      token.cookie = serializedCookie;
      return token;
    },
  },
});

export { handler as GET, handler as POST };
