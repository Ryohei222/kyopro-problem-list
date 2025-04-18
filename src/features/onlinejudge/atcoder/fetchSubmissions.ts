import type { CommonSubmission } from "@/types/CommonSubmission";
import { Resource } from "@prisma/client";
import { type DBSchema, openDB } from "idb";
import z from "zod";

import { fetchApi } from "../../externalapi/fetchApi";
import { ATCODER_API_URL } from "./constants";

const AtcoderSubmissionSchema = z.object({
	contest_id: z.string(),
	problem_id: z.string(),
	epoch_second: z.number(),
	execution_time: z.number().nullable(),
	id: z.number(),
	language: z.string(),
	length: z.number(),
	point: z.number(),
	result: z.string(),
	user_id: z.string(),
});

const AtcoderSubmissionsApiSchema = z.array(AtcoderSubmissionSchema);

type AtcoderSubmission = z.infer<typeof AtcoderSubmissionSchema>;

interface AtcoderSubmissionDB extends DBSchema {
	submissions: {
		key: string;
		value: AtcoderSubmission;
	};
}

const REQUEST_INTERVAL_MS = 1000;
const ALWAYS_FETCH_INTERVAL_SEC = 60 * 60 * 24; // 1 day

async function fetchPartialAtcoderSubmissions(
	user_id: string,
	from_second: number,
) {
	return fetchApi(
		`${ATCODER_API_URL}/atcoder-api/v3/user/submissions?user=${user_id}&from_second=${from_second}`,
		AtcoderSubmissionsApiSchema,
	);
}

async function fetchAtcoderSubmissionsFromSecond(
	user_id: string,
	from_second: number,
	submissions: AtcoderSubmission[] = [],
): Promise<AtcoderSubmission[]> {
	const partialSubmissions = await fetchPartialAtcoderSubmissions(
		user_id,
		from_second,
	);
	if (partialSubmissions.length === 0) {
		return submissions;
	}
	await new Promise((resolve) => setTimeout(resolve, REQUEST_INTERVAL_MS));
	submissions.push(...partialSubmissions);
	return fetchAtcoderSubmissionsFromSecond(
		user_id,
		partialSubmissions[partialSubmissions.length - 1].epoch_second + 1,
		submissions,
	);
}

export async function fetchAtcoderSubmissions(
	user_id: string,
): Promise<CommonSubmission[]> {
	if (!user_id) return [];
	const db = await openDB<AtcoderSubmissionDB>(
		`atcoder-submissions-${user_id}`,
		1,
		{
			upgrade(db) {
				db.createObjectStore("submissions");
			},
		},
	);
	const cachedSubmissions = await db.getAll("submissions");
	const lastSubmissionSecond =
		cachedSubmissions.length > 0
			? Math.max(
					...cachedSubmissions.map((submission) => submission.epoch_second),
				)
			: ALWAYS_FETCH_INTERVAL_SEC;
	const newSubmissions = await fetchAtcoderSubmissionsFromSecond(
		user_id,
		lastSubmissionSecond + 1 - ALWAYS_FETCH_INTERVAL_SEC,
	);
	for (const submission of newSubmissions) {
		db.put("submissions", submission, submission.id.toString());
	}
	return db.getAll("submissions").then((submissions) => {
		return submissions.map((submission) => {
			return {
				submissionId: submission.id.toString(),
				resource: Resource.ATCODER,
				contestId: submission.contest_id,
				problemId: submission.problem_id,
				verdict: submission.result === "AC" ? "AC" : "WA",
				submittedAt: new Date(submission.epoch_second * 1000),
			} satisfies CommonSubmission;
		});
	});
}
