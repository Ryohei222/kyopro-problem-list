import { z } from "zod";
import { CommonSubmission } from "@/types/Submission";
import { Resource } from "@prisma/client";

const YukicoderSubmissionSchema = z.object({
    No: z.number(),
    ProblemId: z.number(),
    Title: z.string(),
    AuthorId: z.number(),
    TesterIds: z.string(),
    Level: z.number(),
    ProblemType: z.number(),
    Tags: z.string(),
    Date: z.string(),
});

const API_URL = "https://yukicoder.me/api/v1";

export async function getYukicoderSubmissions(username: string): Promise<CommonSubmission[]> {
    const result = await fetch(`${API_URL}/solved/name/${username}`)
        .then((res) => res.json())
        .then(YukicoderSubmissionSchema.array().safeParse);
    if (!result.success) {
        throw new Error("Failed to fetch Yukicoder submissions", result.error);
    }
    return result.data.map((submission) => ({
        submissionId: submission.No.toString(),
        resource: Resource.YUKICODER,
        problemId: submission.No.toString(),
        verdict: "AC",
        submittedAt: new Date(submission.Date),
    }));
}
