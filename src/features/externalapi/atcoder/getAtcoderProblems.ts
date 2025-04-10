import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { ATCODER_API_URL } from "./constants";
import { AtcoderProblemsApiSchema } from "./ProblemsSchema";
import { CommonProblem } from "@/types/Problem";

export async function getAtcoderProblems(): Promise<CommonProblem[]> {
    return await fetchApi(
        `${ATCODER_API_URL}/resources/problems.json`,
        AtcoderProblemsApiSchema,
    ).then((problems) => {
        return problems.map((problem) => {
            return {
                resource: Resource.ATCODER,
                contestId: problem.contest_id,
                problemId: problem.id,
                name: problem.name,
            };
        });
    });
}
