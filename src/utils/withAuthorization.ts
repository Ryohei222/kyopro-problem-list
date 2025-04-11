import { auth } from "@/auth";
import { RequestedUserId } from "@/types/RequestedUserId";
import { redirect } from "next/navigation";

export type ArgumentsWithoutRequestedUserId<T extends (...args: any[]) => any> = T extends (
    requestedUserId: RequestedUserId,
    ...args: infer R
) => any
    ? R
    : never;

export function withAuthorization<
    T extends (requestedUserId: RequestedUserId, ...args: any[]) => ReturnType<T>,
>(callback: T) {
    return async function (...args: ArgumentsWithoutRequestedUserId<T>) {
        const session = await auth();
        const requestedUserId = session?.user?.id;
        if (!requestedUserId) {
            redirect("/");
        }
        return callback(requestedUserId as RequestedUserId, args);
    };
}
