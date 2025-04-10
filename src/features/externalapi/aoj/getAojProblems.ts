import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { AOJ_API_URL } from "./constant";
import { AojProblemsApiSchema } from "./ProblemsSchema";
import { CommonProblem } from "@/types/Problem";

export async function getAojProblems(): Promise<CommonProblem[]> {
    return await fetchApi(`${AOJ_API_URL}/problems?size=100000`, AojProblemsApiSchema).then(
        (problems) => {
            return problems.map((problem) => {
                return {
                    resource: Resource.AOJ,
                    contestId: "0",
                    problemId: problem.id,
                    name: problem.name,
                    difficulty: null,
                    contestName: null,
                };
            });
        },
    );
}
