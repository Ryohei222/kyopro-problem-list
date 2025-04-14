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

const CodeforcesProblemStatisticSchema = z.object({
	contestId: z.number(),
	index: z.string(),
	solvedCount: z.number(),
});

export const CodeforcesProblemsApiSchema = z.object({
	status: z.string(),
	result: z.object({
		problems: z.array(CodeforcesProblemSchema),
		problemStatistics: z.array(CodeforcesProblemStatisticSchema),
	}),
});
