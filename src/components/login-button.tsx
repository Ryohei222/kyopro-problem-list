"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        async function fetchSession() {
            const res = await fetch("/api/auth/session");
            const sessionData = await res.json();
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
                    <Link href={`/user/${session.user?.id}`}>マイページ</Link>
                </button>
            )}
        </>
    );
}
