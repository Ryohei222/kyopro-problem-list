import { type DBSchema, openDB } from "idb";
import { fetchApi } from "../utils/fetchApi";
import { CodeforcesSubmission } from "./Submisson";
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

type CodeforcesSubmissionType = z.infer<typeof CodeforcesSubmissionSchema>;
interface CodeforcesSubmissionDB extends DBSchema {
	submissions: {
		key: string;
		value: CodeforcesSubmissionType;
	};
}

export async function fetchCodeforcesSubmissions(
	userId: string,
	from = 1,
	count = 100000,
): Promise<CodeforcesSubmissionType[]> {
	if (!userId) return [];
	if (from < 1 || count < 1) {
		throw new Error("Invalid arguments");
	}
	const data = await fetchApi(
		`${CODEFORCES_API_URL}/user.status?handle=${userId}&count=${count}&from=${from}`,
		CodeforcesSubmissionsApiSchema,
	);
	if (data.status !== "OK") {
		throw new Error("Failed to fetch Codeforces submissions");
	}
	return data.result;
}

const ALWAYS_FETCH_MARGIN = 100;

export async function fetchCodeforcesSubmissionsWithCache(userId: string) {
	if (!userId) return [];
	const db = await openDB<CodeforcesSubmissionDB>(
		`codeforces-submissions-${userId}`,
		1,
		{
			upgrade(db) {
				db.createObjectStore("submissions");
			},
		},
	);
	const cachedSubmissions = await db.getAll("submissions");
	const newSubmissions = await fetchCodeforcesSubmissions(
		userId,
		Math.max(1, cachedSubmissions.length - ALWAYS_FETCH_MARGIN),
	);
	for (const submission of newSubmissions) {
		await db.put("submissions", submission, submission.id.toString());
	}
	return db.getAll("submissions").then((submissions) => {
		return submissions.map((submission) => {
			return new CodeforcesSubmission({
				...submission,
				...submission.problem,
			});
		});
	});
}
