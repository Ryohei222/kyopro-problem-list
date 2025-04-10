import { auth } from "@/auth";
import { redirect } from "next/navigation";

export type ArgumentsType<T extends (...args: any[]) => any> = T extends (...args: infer R) => any
    ? R
    : never;
export type ArgumentsWithoutRequestedUserId<T extends (...args: any[]) => any> = T extends (
    requestedUserId: string,
    ...args: infer R
) => any
    ? R
    : never;

export function withAuthorization<
    T extends (requestedUserId: string, ...args: any[]) => ReturnType<T>,
>(callback: T) {
    return async function (...args: ArgumentsWithoutRequestedUserId<T>) {
        const session = await auth();
        const requestedUserId = session?.user?.id;
        if (!requestedUserId) {
            redirect("/");
        }
        return callback(requestedUserId, args);
    };
}
