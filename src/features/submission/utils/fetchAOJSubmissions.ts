import { CommonSubmission } from "@/types/Submission";
import { Resource } from "@prisma/client";
import { z } from "zod";

const AOJSubmissionSchema = z.object({
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

export type AOJSubmission = z.infer<typeof AOJSubmissionSchema>;

const API_URL = "https://judgeapi.u-aizu.ac.jp";

export async function getAOJSubmissions(user_id: string): Promise<CommonSubmission[]> {
    const result = await fetch(`${API_URL}/solutions/users/${user_id}?size=100000`)
        .then((res) => res.json())
        .then(AOJSubmissionSchema.array().safeParse);
    if (!result.success) {
        throw new Error("Failed to fetch AOJ submissions", result.error);
    }
    return result.data.map((submission) => ({
        submissionId: submission.judgeId.toString(),
        resource: Resource.AOJ,
        problemId: submission.problemId,
        verdict: "AC",
        submittedAt: new Date(submission.submissionDate),
    }));
}
