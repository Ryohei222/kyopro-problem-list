"use client";
import { signIn } from "next-auth/react";

export default function LoginButton() {
    return (
        <button
            onClick={() => signIn("github")}
            className="my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
            Sign in with GitHub
        </button>
    );
}
