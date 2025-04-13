import { signIn } from "@/auth";
import { Button } from "./ui/button";

export default function LoginButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <Button
                type="submit"
                className="my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
                Sign in with GitHub
            </Button>
        </form>
    );
}
