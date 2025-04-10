import { fetchApi } from "../fetchApi";
import { ATCODER_API_URL } from "./constants";
import { AtcoderDifficultyApiSchema } from "./DifficultySchema";

export async function getAtcoderProblemDifficulties(): Promise<Map<string, number>> {
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
