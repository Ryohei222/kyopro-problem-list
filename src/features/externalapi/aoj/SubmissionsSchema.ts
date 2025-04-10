import { z } from "zod";

export const AojSubmissionSchema = z.object({
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

export const AojSubmissionsApiSchema = z.array(AojSubmissionSchema);
