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
          async authorize(credentials, req) : Promise<any> {
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
            const user = {
                id: `${existingUser.id}`,
                username: existingUser.username,
                email: existingUser.email
            };

            
            return user;
          }
        })
      ],
      callbacks: {
        // Session is created
        async jwt({token, user}) {
            if (user) {
                return {
                    ...token,
                    username: user.username,
                    id: user.id
                }
            }
            return token;
        },
        // Check session
        async session({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                    id: token.id
                }
            }
        }
      }
}