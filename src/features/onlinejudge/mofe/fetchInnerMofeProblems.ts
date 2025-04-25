import { z } from "zod";
import { fetchApi } from "../utils/fetchApi";
import { MofeProblem } from "./Problem";

const InnerMofeProblemSchema = z.object({
	contestSlug: z.string(),
	index: z.string(),
	name: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	commonProblemId: z.number(),
	contestName: z.string(),
	difficulty: z.string(),
	points: z.number(),
	slug: z.string(),
	position: z.string(),
});

export async function fetchInnerMofeProblems(): Promise<MofeProblem[]> {
	const problems = await fetchApi(
		"api/problems/MOFE",
		InnerMofeProblemSchema.array(),
	);
	return problems.map((problem) => new MofeProblem(problem));
}
