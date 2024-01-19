import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "@auth/core/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import db from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId:"528606103771-a8ajreo8um91vh2r7rcghav70g3p2f07.apps.googleusercontent.com",
            clientSecret:"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"
        }),
        Credentials({
            credentials: {
              username: { label: "Username" },
              password: {  label: "Password", type: "password" }
            },
            async authorize({ request } : any) {
              const response = await fetch(request)
              if(!response.ok) return null
              return await response.json() ?? null
            }
        })
    ],
    adapter: DrizzleAdapter(db),
    trustHost: true,
    callbacks: {
        async session({ session, user,token }) {
            
          return {...session, ...user, ...token}
        },
    }
})

export const GoogleAuthProvider = 
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    })
