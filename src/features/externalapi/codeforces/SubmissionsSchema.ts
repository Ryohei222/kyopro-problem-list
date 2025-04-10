import { z } from "zod";

export const CodeforcesProblemSchema = z.object({
    contestId: z.number(),
    index: z.string(),
    name: z.string(),
    type: z.string(),
    points: z.number().optional(),
    rating: z.number().optional(),
    tags: z.array(z.string()),
});

export const CodeforcesSubmissionSchema = z.object({
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

export const CodeforcesSubmissionsApiSchema = z.object({
    status: z.string(),
    result: z.array(CodeforcesSubmissionSchema),
});
