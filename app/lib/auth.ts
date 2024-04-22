import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
    },

    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: { label: "username", type: "text"},
            password: { label: "password", type: "password" }
          },
          async authorize(credentials, req) {
            // Check if both fields have inputs
            if (!credentials?.username || !credentials?.password) {
                return null
            }

            // Check if the user exists
            const existingUser = await db.user.findUnique({
                where: { username: credentials?.username }
            })
            if (!existingUser) {
                return null;
            }
            
            // Check if the encrypted password exists
            const passwordMatch = await compare(credentials.password, existingUser.password);
            
            if (!passwordMatch) {
                return null;
            }


            // id needs to be a string instead of number
            return {
                id: `${existingUser.id}`,
                username: existingUser.username,
                email: existingUser.email
            }
          }
        })
      ],
      callbacks: {
        async jwt({token, user}) {
            console.log("Token")
            console.log(token)
            console.log("User")
            console.log(user)

            if (user) {
                return {
                    ...token,
                    user: user.username
                }
            }
            return token;
        },
        async session({session, user, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }
        }



      }

}