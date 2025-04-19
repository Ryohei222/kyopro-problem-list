import { Resource } from "@prisma/client";
import type { CommonSubmission } from "../../../types/CommonSubmission";
import { fetchApi } from "../utils/fetchApi";
import { AOJ_API_URL } from "./constants";

import { z } from "zod";

const AojSubmissionSchema = z.object({
	judgeId: z.number(),
	userId: z.string(),
	problemId: z.string(),
	language: z.string(),
	version: z.string(),
	submissionDate: z.number(),
	judgeDate: z.number(),
	cpuTime: z.number(),
	memory: z.number(),
	codeSize: z.number(),
	server: z.number(),
	policy: z.string(),
	rating: z.number(),
	review: z.number(),
});

const AojSubmissionsApiSchema = z.array(AojSubmissionSchema);

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
