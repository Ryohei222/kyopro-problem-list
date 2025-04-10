import { Resource } from "@prisma/client";
import { fetchApi } from "../fetchApi";
import { MOFE_API_URL } from "./constant";
import { MofeContestApiSchema, MofeContestsApiSchema } from "./ContestsSchema";
import { CommonProblem } from "@/types/Problem";

export async function getMofeProblems(): Promise<CommonProblem[]> {
    const contests = await fetchApi(`${MOFE_API_URL}/contests`, MofeContestsApiSchema);
    let problems = [];
    for (const contest of contests.past) {
        const contestDetail = await fetchApi(
            `${MOFE_API_URL}/contests/${contest.slug}`,
            MofeContestApiSchema,
        );
        problems.push(
            ...contestDetail.tasks
                .map((problem) => ({
                    name: problem.name,
                    contestId: contest?.id ? contest.id.toString() : "",
                    problemId: problem.slug,
                    resource: Resource.MOFE,
                }))
                .filter((problem) => problem.problemId !== ""),
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return problems;
}
