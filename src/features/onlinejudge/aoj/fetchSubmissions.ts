import { z } from "zod";
import { fetchApi } from "../utils/fetchApi";
import { AojSubmission } from "./Submission";
import { AOJ_API_URL } from "./constants";

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
): Promise<AojSubmission[]> {
	if (!userId) return [];
	const submissions = await fetchApi(
		`${AOJ_API_URL}/solutions/users/${userId}?size=100000`,
		AojSubmissionsApiSchema,
	);
	return submissions.map((submission) => new AojSubmission(submission));
}
