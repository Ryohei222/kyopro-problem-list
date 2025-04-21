import { z } from "zod";
import { fetchApi } from "../utils/fetchApi";
import { ATCODER_API_URL } from "./constants";

const AtcoderDifficultySchema = z.object({
	slope: z.number().optional(),
	intercept: z.number().optional(),
	variance: z.number().optional(),
	difficulty: z.number().optional(),
	discrimination: z.number().optional(),
	irt_loglikelihood: z.number().optional(),
	irt_users: z.number().optional(),
	is_experimental: z.boolean().optional(),
});

const AtcoderDifficultyApiSchema = z.record(
	z.string(),
	AtcoderDifficultySchema,
);

export async function fetchAtcoderProblemDifficulties(): Promise<
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
			difficulties.set(key, problem.difficulty);
		}
		return difficulties;
	});
}
