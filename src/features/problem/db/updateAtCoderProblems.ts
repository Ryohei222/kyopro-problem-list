import { ProblemProvider } from "@prisma/client";
import { CreatedProblem } from "../types/Problem";
import { z } from "zod";
import { prisma } from "@/prisma";

export default async function updateAtCoderProblems(): Promise<CreatedProblem[]> {
    const URL = "https://kenkoooo.com/atcoder/resources/problems.json";

    const AtCoderProblemSchema = z.object({
        id: z.string(),
        contest_id: z.string(),
        problem_index: z.string(),
        name: z.string(),
        title: z.string(),
    });

    const AtCoderProblemsSchema = z.array(AtCoderProblemSchema);

    const res = await fetch(URL)
        .then((res) => res.json())
        .then(AtCoderProblemsSchema.safeParse);
    if (!res.success) {
        console.error("Failed to fetch or parse data:", res.error);
        return [];
    }
    const problems = res.data;
    const createdProblems = await prisma.problem.createManyAndReturn({
        data: problems.map((problem) => ({
            provider: ProblemProvider.ATCODER,
            contestId: problem.contest_id,
            problemId: problem.id,
            title: problem.name,
        })),
        skipDuplicates: true,
    });
    return createdProblems;
}
