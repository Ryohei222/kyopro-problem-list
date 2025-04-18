import type { CommonProblem } from "@/types/CommonProblem";
import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { AtcoderProblemsApiSchema } from "./ProblemsSchema";
import { ATCODER_API_URL } from "./constants";
import { getAtcoderContests } from "./getAtcoderContests";
import { getAtcoderProblemDifficulties } from "./getAtcoderProblemDifficulties";

export async function getAtcoderProblems(): Promise<CommonProblem[]> {
	const difficultiesPromise = getAtcoderProblemDifficulties();
	const contestsPromise = getAtcoderContests().then((contests) => {
		const contestsMap = new Map<string, string>();
		for (const contest of contests) {
			contestsMap.set(contest.id, contest.title);
		}
		return contestsMap;
	});
	const [difficulties, contests] = await Promise.all([
		difficultiesPromise,
		contestsPromise,
	]);
	return fetchApi(
		`${ATCODER_API_URL}/resources/problems.json`,
		AtcoderProblemsApiSchema,
	).then((problems) => {
		return problems.map((problem) => {
			return {
				resource: Resource.ATCODER,
				contestId: problem.contest_id,
				problemId: problem.id,
				name: problem.name,
				difficulty: difficulties.get(problem.id) || null,
				contestName: contests.get(problem.contest_id) || null,
			};
		});
	});
}
