import { fetchApi } from "../utils/fetchApi";
import { CodeforcesProblem } from "./Problem";
import { CODEFORCES_API_URL } from "./constants";

import { z } from "zod";
import { fetchCodeforcesContests } from "./fetchContests";

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

export async function fetchCodeforcesProblems(): Promise<CodeforcesProblem[]> {
	const contests = await fetchCodeforcesContests();
	const contestMap = new Map(contests.map((c) => [c.id, c.name]));
	const data = await fetchApi(
		`${CODEFORCES_API_URL}/problemset.problems`,
		CodeforcesProblemsApiSchema,
	);
	return data.result.problems.map(
		(p) =>
			new CodeforcesProblem({
				...p,
				contestName: contestMap.get(p.contestId) ?? "",
				points: p.points ?? undefined,
				rating: p.rating ?? undefined,
			}),
	);
}
