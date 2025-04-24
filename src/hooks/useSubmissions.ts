"use client";

import { ClientSideOnlineJudgeApi } from "@/features/onlinejudge/OnlineJudges";
import type { Resource } from "@/types/Resource";
import useSWRMutation from "swr/mutation";

export function useSubmissions(resource: Resource, userId: string) {
	const { data, error, trigger, isMutating } = useSWRMutation(
		`/submissions/${resource}/${userId}`,
		(url: string, { arg }: { arg: string }) =>
			ClientSideOnlineJudgeApi[resource].fetchSubmissions(userId),
	);
	return {
		submissions: data,
		error,
		trigger,
		isMutating,
	};
}
