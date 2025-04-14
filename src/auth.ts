import { getUser } from "@/features/user/db/getUser";
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

const authConfig = {
	adapter: PrismaAdapter(prisma),
	callbacks: {
		authorized({ request, auth }) {
			const { pathname } = request.nextUrl;
			return true;
		},
		async session({ session, token }) {
			if (!token.sub) return session;
			const existingUser = await getUser(token.sub);
			if (!existingUser) return session;
			session.user.id = existingUser.id;
			session.user.name = existingUser.name;
			session.user.image = existingUser.image;
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUser(token.sub);
			if (!existingUser) return token;
			token.name = existingUser.name;
			token.id = existingUser.id;
			token.image = existingUser.image;
			return token;
		},
	},
	session: { strategy: "jwt" },
	providers: [
		Github({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
	],
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
