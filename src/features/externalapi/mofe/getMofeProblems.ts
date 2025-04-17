import type { CommonProblem } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { MofeContestApiSchema, MofeContestsApiSchema } from "./ContestsSchema";
import { MOFE_API_URL } from "./constant";

export async function getMofeProblems(): Promise<CommonProblem[]> {
	const contests = await fetchApi(
		`${MOFE_API_URL}/contests`,
		MofeContestsApiSchema,
	);
	const problems = [];
	for (const contest of contests.past) {
		const contestDetail = await fetchApi(
			`${MOFE_API_URL}/contests/${contest.slug}`,
			MofeContestApiSchema,
		);
		problems.push(
			...contestDetail.tasks
				.map((problem) => ({
					name: problem.name,
					contestId: contest.slug,
					problemId: problem.slug,
					resource: Resource.MOFE,
					contestName: contest.name,
					difficulty: null,
				}))
				.filter((problem) => problem.problemId !== ""),
		);
		await new Promise((resolve) => setTimeout(resolve, 500));
	}
	return problems;
}
