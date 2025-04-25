import { z } from "zod";
import { fetchApi } from "../utils/fetchApi";
import { AojProblem } from "./Problem";
import { AOJ_API_URL } from "./constants";

const AojProblemSchema = z.object({
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

const AojProblemsApiSchema = z.array(AojProblemSchema);

export async function fetchAojProblems(): Promise<AojProblem[]> {
	const problems = await fetchApi(
		`${AOJ_API_URL}/problems?size=100000`,
		AojProblemsApiSchema,
	);
	return problems.map((p) => new AojProblem(p));
}
