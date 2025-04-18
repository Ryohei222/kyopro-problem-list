import z from "zod";
import { fetchApi } from "../utils/fetchApi";
import { AtcoderProblem } from "./Problem";
import { ATCODER_API_URL } from "./constants";
import { fetchAtcoderContests } from "./fetchContests";
import { fetchAtcoderProblemDifficulties } from "./fetchDifficulties";

const AtcoderProblemSchema = z.object({
	id: z.string(),
	contest_id: z.string(),
	problem_index: z.string(),
	name: z.string(),
	title: z.string(),
});

const AtcoderProblemsApiSchema = z.array(AtcoderProblemSchema);

export async function fetchAtcoderProblems(): Promise<AtcoderProblem[]> {
	const difficultiesPromise = fetchAtcoderProblemDifficulties();
	const contestsPromise = fetchAtcoderContests().then((contests) => {
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
