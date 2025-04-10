import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { CODEFORCES_API_URL } from "./constant";
import { CodeforcesProblemsApiSchema } from "./ProblemsSchema";
import { CommonProblem } from "@/types/Problem";

export async function getCodeforcesProblems(): Promise<CommonProblem[]> {
    return await fetchApi(
        `${CODEFORCES_API_URL}/problemset.problems`,
        CodeforcesProblemsApiSchema,
    ).then((data) => {
        return data.result.problems.map((problem) => {
            return {
                resource: Resource.CODEFORCES,
                contestId: problem.contestId.toString(),
                problemId: problem.index,
                name: problem.name,
            };
        });
    });
}
