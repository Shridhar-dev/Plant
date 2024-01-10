import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import db from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [Google(
        {
            clientId:"528606103771-a8ajreo8um91vh2r7rcghav70g3p2f07.apps.googleusercontent.com",
            clientSecret:"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"
        }
    )],
    adapter: DrizzleAdapter(db),
    pages: {
        signIn: "/login",
    },
})

export const GoogleAuthProvider = 
    Google({
        clientId:"528606103771-a8ajreo8um91vh2r7rcghav70g3p2f07.apps.googleusercontent.com",
        clientSecret:"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"
    })
