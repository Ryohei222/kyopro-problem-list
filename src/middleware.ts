import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import { authRoutes, publicRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from "@/route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    console.log("pathname", nextUrl.pathname);
    console.log("isLoggedIn", isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL(apiAuthPrefix, nextUrl));
    }

    return null;
});

export const config = {
    matcher: ["/create"],
};
