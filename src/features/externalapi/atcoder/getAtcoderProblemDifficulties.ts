import { fetchApi } from "../fetchApi";
import { AtcoderDifficultyApiSchema } from "./DifficultySchema";
import { ATCODER_API_URL } from "./constants";

function correctAtcoderDifficulty(difficulty: number): number {
	if (difficulty >= 400) {
		return difficulty;
	}
	const correctedDifficulty = Math.floor(
		400 / Math.exp((400 - difficulty) / 400) + 0.5,
	);
	return correctedDifficulty;
}

export async function getAtcoderProblemDifficulties(): Promise<
	Map<string, number>
> {
	return fetchApi(
		`${ATCODER_API_URL}/resources/problem-models.json`,
		AtcoderDifficultyApiSchema,
	).then((data) => {
		const difficulties = new Map<string, number>();
		for (const key in data) {
			const problem = data[key];
			if (!problem.difficulty) {
				continue;
			}
			difficulties.set(key, correctAtcoderDifficulty(problem.difficulty));
		}
		return difficulties;
	});
}
