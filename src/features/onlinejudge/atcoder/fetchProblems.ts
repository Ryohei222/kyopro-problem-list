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

function correctAtcoderDifficulty(difficulty: number): number {
	if (difficulty >= 400) {
		return difficulty;
	}
	const correctedDifficulty = Math.floor(
		400 / Math.exp((400 - difficulty) / 400) + 0.5,
	);
	return correctedDifficulty;
}

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
			const difficulty = difficulties.get(problem.id);
			return new AtcoderProblem(
				problem.id,
				problem.contest_id,
				problem.name,
				contests.get(problem.contest_id) ?? "",
				difficulty !== undefined
					? correctAtcoderDifficulty(difficulty)
					: undefined,
			);
		});
	});
}
