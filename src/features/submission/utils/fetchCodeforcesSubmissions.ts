import { CommonSubmission } from "@/types/Submission";
import { Resource } from "@prisma/client";
import { z } from "zod";

const ProblemSchema = z.object({
    contestId: z.number(),
    index: z.string(),
    name: z.string(),
    type: z.string(),
    points: z.number().optional(),
    rating: z.number().optional(),
    tags: z.array(z.string()),
});

const AuthorSchema = z.object({
    contestId: z.number(),
    members: z.array(
        z.object({
            handle: z.string(),
        }),
    ),
    participantType: z.string(),
    ghost: z.boolean(),
    startTimeSeconds: z.number(),
});

const SubmissionSchema = z.object({
    id: z.number(),
    contestId: z.number(),
    creationTimeSeconds: z.number(),
    relativeTimeSeconds: z.number(),
    problem: ProblemSchema,
    author: AuthorSchema,
    programmingLanguage: z.string(),
    verdict: z.string(),
    testset: z.string(),
    passedTestCount: z.number(),
    timeConsumedMillis: z.number(),
    memoryConsumedBytes: z.number(),
});

const FetchCodeforcesSubmissionsSchema = z.object({
    status: z.string(),
    result: z.array(SubmissionSchema),
});

const API_URL = "https://codeforces.com/api";

export async function getCodeforcesSubmissions(user_id: string): Promise<CommonSubmission[]> {
    if (!user_id) return [];
    const result = await fetch(`${API_URL}/user.status?handle=${user_id}&count=100000`)
        .then((res) => res.json())
        .then(FetchCodeforcesSubmissionsSchema.safeParse);
    if (!result.success) {
        console.error("Failed to fetch Codeforces submissions:", result.error);
        throw new Error("Failed to fetch Codeforces submissions", result.error);
    }
    return result.data.result.map((submission) => ({
        submissionId: submission.id.toString(),
        resource: Resource.CODEFORCES,
        problemId: `${submission.contestId}${submission.problem.index}`,
        verdict: submission.verdict === "OK" ? "AC" : "WA",
        submittedAt: new Date(submission.creationTimeSeconds * 1000),
    }));
}
