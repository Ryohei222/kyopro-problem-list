import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma";
import { getUserById } from "@/controller/User"
import authConfig from "./auth.config";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      return true;
    },
    async session({ session, token }) {
      if (!token.sub) return session;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return session;
      session.user.id = existingUser.id;
      session.user.name = existingUser.name;
      session.user.image = existingUser.image;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.name = existingUser.name;
      token.id = existingUser.id;
      token.image = existingUser.image;
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig
})