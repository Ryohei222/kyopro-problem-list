"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";

import { signIn } from "next-auth/react";

export default function UserButton() {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        async function fetchSession() {
            const res = await fetch("/api/auth/session");

            const sessionData = await res.json();
            console.log("sessionData", sessionData);
            setSession(sessionData);
        }

        fetchSession();
    }, []);

    return (
        <>
            {!session ? (
                <button
                    onClick={() => signIn("github")}
                    className="my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                    Sign in with GitHub
                </button>
            ) : (
                <button className="my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                    {session.user?.name}
                </button>
            )}
        </>
    );
}
