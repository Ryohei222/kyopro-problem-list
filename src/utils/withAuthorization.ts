import { auth } from "@/auth";
import { type RequestedUserId, createUserId } from "@/types/RequestedUserId";
import { redirect } from "next/navigation";

// biome-ignore lint: reason
type OmitFirstArg<F> = F extends (x: RequestedUserId, ...args: infer P) => any
	? P
	: never;

export function withAuthorization<
	// biome-ignore lint: reason
	F extends (x: RequestedUserId, ...args: any[]) => any,
>(callback: F) {
	return async (...args: OmitFirstArg<F>) => {
		const session = await auth();
		const requestedUserId = session?.user?.id;
		if (!requestedUserId) {
			redirect("/");
		}
		return callback(createUserId(requestedUserId), ...args);
	};
}
