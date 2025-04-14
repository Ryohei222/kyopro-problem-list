"use client";

import { getSubmissions } from "@/features/externalapi/getSubmissions";
import type { CommonSubmission } from "@/types/CommonSubmission";
import { Resource } from "@prisma/client";
import useSWRMutation from "swr/mutation";

function wrapGetContestSubmissions(
	contest: string,
	getSubmissions: (id: string) => Promise<CommonSubmission[]>,
) {
	return (id: string) => {
		const { data, error, trigger, isMutating } = useSWRMutation(
			`/submissions/${contest}`,
			(url: string, { arg }: { arg: string }) => getSubmissions(arg),
		);
		return {
			submissions: data,
			error,
			trigger,
			isMutating,
		};
	};
}

export const useAojSubmissions = wrapGetContestSubmissions(
	"aoj",
	(id: string) => getSubmissions(Resource.AOJ, id),
);
export const useAtcoderSubmissions = wrapGetContestSubmissions(
	"atcoder",
	(id: string) => getSubmissions(Resource.ATCODER, id),
);
export const useCodeforcesSubmissions = wrapGetContestSubmissions(
	"codeforces",
	(id: string) => getSubmissions(Resource.CODEFORCES, id),
);
export const useYukicoderSubmissions = wrapGetContestSubmissions(
	"yukicoder",
	(id: string) => getSubmissions(Resource.YUKICODER, id),
);
