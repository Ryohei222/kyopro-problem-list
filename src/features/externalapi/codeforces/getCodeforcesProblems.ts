import type { CommonProblem } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { CodeforcesProblemsApiSchema } from "./ProblemsSchema";
import { CODEFORCES_API_URL } from "./constant";
import { getCodeforcesContests } from "./getCodeforcesContests";

export async function getCodeforcesProblems(): Promise<CommonProblem[]> {
	const contestMap = await getCodeforcesContests().then((contests) => {
		return new Map(contests.map((contest) => [contest.id, contest.name]));
	});
	return fetchApi(
		`${CODEFORCES_API_URL}/problemset.problems`,
		CodeforcesProblemsApiSchema,
	).then((data) => {
		return data.result.problems.map((problem) => {
			return {
				resource: Resource.CODEFORCES,
				contestId: problem.contestId.toString(),
				problemId: problem.index,
				name: problem.name,
				difficulty: problem.rating || null,
				contestName: contestMap.get(problem.contestId) || null,
			};
		});
	});
}
