import { z } from "zod";
import { fetchApi } from "../utils/fetchApi";
import { AojSubmission } from "./Submission";
import { AOJ_API_URL } from "./constants";

const AojSubmissionSchema = z.object({
	judgeId: z.number(),
	judgeType: z.number(),
	userId: z.string(),
	problemId: z.string(),
	submissionDate: z.number(),
	language: z.string(),
	status: z.number(),
	cpuTime: z.number(),
	memory: z.number(),
	codeSize: z.number(),
	accuracy: z.string(),
	judgeDate: z.number(),
	score: z.number(),
	problemTitle: z.string().nullable(),
	token: z.string().nullable(),
});

const AojSubmissionsApiSchema = z.array(AojSubmissionSchema);

export async function fetchAojSubmissions(
	userId: string,
): Promise<AojSubmission[]> {
	if (!userId) return [];
	const submissions = await fetchApi(
		`${AOJ_API_URL}/submission_records/users/${userId}?size=100000`,
		AojSubmissionsApiSchema,
	);
	return submissions.map((submission) => new AojSubmission(submission));
}
