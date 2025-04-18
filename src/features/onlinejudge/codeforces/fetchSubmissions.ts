import { Resource } from "@prisma/client";
import { CodeforcesSubmissionsApiSchema } from "../../externalapi/codeforces/SubmissionsSchema";
import type { CommonSubmission } from "../interfaces/CommonSubmission";
import { fetchApi } from "../utils/fetchApi";
import { CODEFORCES_API_URL } from "./constants";

export async function fetchCodeforcesSubmissions(
	userId: string,
): Promise<CommonSubmission[]> {
	if (!userId) return [];
	const data = await fetchApi(
		`${CODEFORCES_API_URL}/user.status?handle=${userId}&count=100000`,
		CodeforcesSubmissionsApiSchema,
	);
	return data.result.map((submission) => ({
		submissionId: submission.id.toString(),
		resource: Resource.CODEFORCES,
		contestId: submission.contestId.toString(),
		problemId: submission.problem.index,
		verdict: submission.verdict === "OK" ? "AC" : "WA",
		submittedAt: new Date(submission.creationTimeSeconds * 1000),
	}));
}
