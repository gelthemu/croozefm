import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { NextAuthOptions } from 'next-auth'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        });

        if (!user) return null

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        return isPasswordValid
          ? {
            id: user.id,
            username: user.username,
            email: user.email,
          } : null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/user/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user = session.user || {};
        session.user.id = token.sub;
        session.user.username = token.username as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
  },
  // only show debug logs in non-production environments
  debug: process.env.NODE_ENV !== "production",
}

