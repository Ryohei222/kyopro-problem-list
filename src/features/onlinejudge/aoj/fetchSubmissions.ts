import { Resource } from "@prisma/client";
import { AojSubmissionsApiSchema } from "../../externalapi/aoj/SubmissionsSchema";
import type { CommonSubmission } from "../interfaces/CommonSubmission";
import { fetchApi } from "../utils/fetchApi";
import { AOJ_API_URL } from "./constants";

export async function fetchAojSubmissions(
	userId: string,
): Promise<CommonSubmission[]> {
	if (!userId) return [];
	const submissions = await fetchApi(
		`${AOJ_API_URL}/solutions/users/${userId}?size=100000`,
		AojSubmissionsApiSchema,
	);
	return submissions.map((submission) => ({
		submissionId: submission.judgeId.toString(),
		resource: Resource.AOJ,
		problemId: submission.problemId,
		verdict: "AC",
		submittedAt: new Date(submission.submissionDate),
	}));
}
