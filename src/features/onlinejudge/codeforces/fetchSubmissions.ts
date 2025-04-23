import { fetchApi } from "../utils/fetchApi";
import { CodeforcesSubmission } from "./Submissons";
import { CODEFORCES_API_URL } from "./constants";

import { z } from "zod";

const CodeforcesProblemSchema = z.object({
	contestId: z.number(),
	index: z.string(),
	name: z.string(),
	type: z.string(),
	points: z.number().optional(),
	rating: z.number().optional(),
	tags: z.array(z.string()),
});

const CodeforcesSubmissionSchema = z.object({
	id: z.number(),
	contestId: z.number(),
	creationTimeSeconds: z.number(),
	relativeTimeSeconds: z.number(),
	problem: CodeforcesProblemSchema,
	programmingLanguage: z.string(),
	verdict: z.string(),
	testset: z.string(),
	passedTestCount: z.number(),
	timeConsumedMillis: z.number(),
	memoryConsumedBytes: z.number(),
});

const CodeforcesSubmissionsApiSchema = z.object({
	status: z.string(),
	result: z.array(CodeforcesSubmissionSchema),
});

export async function fetchCodeforcesSubmissions(
	userId: string,
): Promise<CodeforcesSubmission[]> {
	if (!userId) return [];
	const data = await fetchApi(
		`${CODEFORCES_API_URL}/user.status?handle=${userId}&count=100000`,
		CodeforcesSubmissionsApiSchema,
	);
	return data.result.map(
		(submission) =>
			new CodeforcesSubmission({
				...submission.problem,
				...submission,
			}),
	);
}
