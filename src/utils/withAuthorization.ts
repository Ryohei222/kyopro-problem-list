import { auth } from "@/auth";
import { RequestedUserId } from "@/types/RequestedUserId";
import { redirect } from "next/navigation";

type OmitFirstArg<F> = F extends (x: RequestedUserId, ...args: infer P) => any ? P : never;

export function withAuthorization<F extends (...args: any[]) => any>(callback: F) {
    return async function (...args: OmitFirstArg<F>) {
        const session = await auth();
        const requestedUserId = session?.user?.id;
        if (!requestedUserId) {
            redirect("/");
        }
        return callback(requestedUserId as RequestedUserId, ...args);
    };
}
