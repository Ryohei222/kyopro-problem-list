import { z } from "zod";

export const AojProblemSchema = z.object({
    id: z.string(),
    available: z.number(),
    doctype: z.number(),
    name: z.string(),
    problemTimeLimit: z.number(),
    problemMemoryLimit: z.number(),
    maxScore: z.number(),
    solvedUser: z.number(),
    submissions: z.number(),
    recommendations: z.number(),
    isSolved: z.boolean(),
    bookmark: z.boolean(),
    recommend: z.boolean(),
    successRate: z.number(),
    score: z.number(),
    userScore: z.number(),
});

export const AojProblemsApiSchema = z.array(AojProblemSchema);
