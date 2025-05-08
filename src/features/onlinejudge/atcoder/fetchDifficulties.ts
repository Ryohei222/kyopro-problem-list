import { z } from "zod";
import { fetchApi } from "../utils/fetchApi";
import { ATCODER_API_URL } from "./constants";

const AtcoderDifficultySchema = z.object({
	slope: z.number().optional().nullable(),
	intercept: z.number().optional().nullable(),
	variance: z.number().optional().nullable(),
	difficulty: z.number().optional().nullable(),
	discrimination: z.number().optional().nullable(),
	irt_loglikelihood: z.number().optional().nullable(),
	irt_users: z.number().optional().nullable(),
	is_experimental: z.boolean().optional().nullable(),
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
