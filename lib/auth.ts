import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import EmailProvider from "@auth/core/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: DrizzleAdapter(db),
  trustHost: true,
  callbacks: {
    async session({ session, user, token }) {
      return { ...session, ...user, ...token };
    },
  },
});

export const GoogleAuthProvider = Google({
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
});

export const EmailAuthProvider = EmailProvider({
  server: process.env.EMAIL_SERVER,
  from: process.env.EMAIL_FROM,
})
