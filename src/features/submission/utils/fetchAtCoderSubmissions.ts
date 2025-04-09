import { CommonSubmission } from "@/types/Submission";
import { Resource } from "@prisma/client";
import { openDB, DBSchema } from "idb";
import { z } from "zod";

const AtCoderSubmissionSchema = z.object({
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

export type AtCoderSubmission = z.infer<typeof AtCoderSubmissionSchema>;

interface AtCoderSubmissionDB extends DBSchema {
    submissions: {
        key: string;
        value: AtCoderSubmission;
    };
}

const API_URL = "https://kenkoooo.com/atcoder/atcoder-api/v3";
const REQUEST_INTERVAL_MS = 1000;
const ALWAYS_FETCH_INTERVAL_SEC = 60 * 60 * 24; // 1 day

async function fetchPartialAtCoderSubmissions(user_id: string, from_second: number) {
    const result = await fetch(
        `${API_URL}/user/submissions?user=${user_id}&from_second=${from_second}`,
    )
        .then((res) => res.json())
        .then(AtCoderSubmissionSchema.array().safeParse);
    if (!result.success) {
        console.error("Failed to fetch AtCoder submissions:", result.error);
        return [];
    }
    return result.data;
}

async function fetchAtCoderSubmissionsFromSecond(
    user_id: string,
    from_second: number,
    submissions: AtCoderSubmission[] = [],
): Promise<AtCoderSubmission[]> {
    const partialSubmissions = await fetchPartialAtCoderSubmissions(user_id, from_second);
    if (partialSubmissions.length === 0) {
        return submissions;
    }
    await new Promise((resolve) => setTimeout(resolve, REQUEST_INTERVAL_MS));
    submissions.push(...partialSubmissions);
    return await fetchAtCoderSubmissionsFromSecond(
        user_id,
        partialSubmissions[partialSubmissions.length - 1].epoch_second + 1,
        submissions,
    );
}

export async function getAtCoderSubmissions(user_id: string): Promise<CommonSubmission[]> {
    if (!user_id) return [];
    const db = await openDB<AtCoderSubmissionDB>(`atcoder-submissions-${user_id}`, 1, {
        upgrade(db) {
            db.createObjectStore("submissions");
        },
    });
    const cachedSubmissions = await db.getAll("submissions");
    const lastSubmissionSecond =
        cachedSubmissions.length > 0
            ? Math.max(...cachedSubmissions.map((submission) => submission.epoch_second))
            : ALWAYS_FETCH_INTERVAL_SEC;
    const newSubmissions = await fetchAtCoderSubmissionsFromSecond(
        user_id,
        lastSubmissionSecond + 1 - ALWAYS_FETCH_INTERVAL_SEC,
    );
    for (const submission of newSubmissions) {
        db.put("submissions", submission, submission.id.toString());
    }
    return await db.getAll("submissions").then((submissions) => {
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
