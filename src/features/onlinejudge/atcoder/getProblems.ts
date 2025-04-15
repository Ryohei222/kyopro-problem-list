import { fetchApi } from "../utils/fetchApi";
import { AtcoderProblem, AtcoderProblemsApiSchema } from "./Problem";
import { ATCODER_API_URL } from "./constants";
import { getAtcoderContests } from "./getContests";
import { getAtcoderProblemDifficulties } from "./getDifficulties";

export async function getAtcoderProblems(): Promise<AtcoderProblem[]> {
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
			return new AtcoderProblem(
				problem.id,
				problem.contest_id,
				problem.problem_index,
				problem.name,
				problem.title,
				contests.get(problem.contest_id) ?? "",
				difficulties.get(problem.id),
			);
		});
	});
}
